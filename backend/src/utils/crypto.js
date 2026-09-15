import crypto from "crypto";
import { ApiError } from "./apiResponse.js";

// Keys can be stored in .env as full PEM blocks or as a single-line base64
// DER string (what a typical node:generateKeyPairSync save produces).
// These helpers normalize whatever form is present and hand Node a proper
// key object so encryption/decryption just works either way.

const normalizeKeyBody = (keyValue = "") =>
  ("" + keyValue)
    .replace(/-----[^-]+-----/g, "") // strip PEM headers
    .replace(/\s+/g, "")            // strip whitespace / escaped newlines
    .trim();

const hasPemHeaders = (env) => env.includes("-----BEGIN");

const loadPublicKey = () => {
  const env = process.env.RSA_PUBLIC_KEY ?? "";
  const body = normalizeKeyBody(env);
  if (!body) {
    throw new ApiError(500, "RSA_PUBLIC_KEY is not configured on the server");
  }
  if (hasPemHeaders(env)) {
    return crypto.createPublicKey(env);
  }
  // Raw base64 DER (SPKI).
  return crypto.createPublicKey({
    key: Buffer.from(body, "base64"),
    format: "der",
    type: "spki",
  });
};

const loadPrivateKey = () => {
  const env = process.env.RSA_PRIVATE_KEY ?? "";
  const body = normalizeKeyBody(env);
  if (!body) {
    throw new ApiError(500, "RSA_PRIVATE_KEY is not configured on the server");
  }
  if (hasPemHeaders(env)) {
    return crypto.createPrivateKey(env);
  }
  // Raw base64 DER — try PKCS#8 first, then legacy PKCS#1.
  try {
    return crypto.createPrivateKey({
      key: Buffer.from(body, "base64"),
      format: "der",
      type: "pkcs8",
    });
  } catch {
    return crypto.createPrivateKey({
      key: Buffer.from(body, "base64"),
      format: "der",
      type: "pkcs1",
    });
  }
};

// Exposes the public key as an SPKI PEM — exactly what the browser
// WebCrypto `crypto.subtle.importKey("spki", …)` expects.
export const getPublicKey = () =>
  loadPublicKey().export({ type: "spki", format: "pem" }).toString();

// Unwraps the RSA-encrypted AES-256 key sent by the browser.
const unwrapAesKey = (encryptedKeyB64) => {
  if (!encryptedKeyB64) throw new ApiError(400, "Encrypted key is missing");
  try {
    return crypto.privateDecrypt(
      {
        key: loadPrivateKey(),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(encryptedKeyB64, "base64"),
    );
  } catch (error) {
    console.error("RSA unwrap failed:", error?.message);
    throw new ApiError(400, "Failed to unwrap the request key");
  }
};

// Decrypts a hybrid-encrypted request body of the shape
// { __encrypted: true, enc, iv, data } and returns the parsed JSON object.
// The browser generated an AES-256-GCM key, encrypted the JSON payload with
// it, then wrapped the AES key with the RSA public key (OAEP/SHA-256).
export const decryptJsonBody = (encrypted) => {
  if (!encrypted || typeof encrypted !== "object") {
    throw new ApiError(400, "Encrypted payload is missing");
  }
  const aesKey = unwrapAesKey(encrypted.enc);
  const iv = Buffer.from(encrypted.iv, "base64");
  const payload = Buffer.from(encrypted.data, "base64");

  if (iv.length !== 12) throw new ApiError(400, "Invalid encryption IV");
  if (payload.length < 16) throw new ApiError(400, "Encrypted payload is invalid");

  // AES-GCM appends a 16-byte auth tag to the ciphertext — split it off.
  const authTag = payload.subarray(payload.length - 16);
  const ciphertext = payload.subarray(0, payload.length - 16);

  try {
    const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, iv);
    decipher.setAuthTag(authTag);
    const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return JSON.parse(plain.toString("utf8"));
  } catch (error) {
    console.error("AES decrypt failed:", error?.message);
    throw new ApiError(400, "Failed to decrypt the request payload");
  }
};