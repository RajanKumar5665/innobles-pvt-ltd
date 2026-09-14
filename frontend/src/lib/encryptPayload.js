

let cachedPublicKey = null;

const pemToArrayBuffer = (pem) => {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  // Chunk it — String.fromCharCode(...spread) would blow the stack on
  // anything larger than a few Kb.
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
};

// Fetch the RSA public key once and cache it for the session.
const getPublicKeyPem = async (apiBase) => {
  if (cachedPublicKey) return cachedPublicKey;
  const res = await fetch(`${apiBase}/admin/auth/public-key`, {
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  console.log(json);
  
  if (!res.ok || !json?.data?.key) {
    throw new Error("Could not fetch the public encryption key");
  }
  cachedPublicKey = json.data.key;
  return cachedPublicKey;
};

// Encrypts any JSON-serialisable value and returns the JSON string to send.
export const encryptPayload = async (payload, apiBase) => {
  const pem = await getPublicKeyPem(apiBase);
  const publicKey = await crypto.subtle.importKey(
    "spki",
    pemToArrayBuffer(pem),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );

  // Random symmetric key + IV for the actual data.
  const aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    new TextEncoder().encode(JSON.stringify(payload)),
  );

  // Wrap the AES key with RSA so only the server can unwrap it.
  const rawKey = await crypto.subtle.exportKey("raw", aesKey);
  const wrappedKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawKey,
  );

  return JSON.stringify({
    __encrypted: true,
    enc: arrayBufferToBase64(wrappedKey),
    iv: arrayBufferToBase64(iv),
    data: arrayBufferToBase64(ciphertext),
  });
};