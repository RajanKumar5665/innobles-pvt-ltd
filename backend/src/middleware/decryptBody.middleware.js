import { decryptJsonBody } from "../utils/crypto.js";
import { ApiError } from "../utils/apiResponse.js";

// Middleware that transparently decrypts hybrid-encrypted JSON request bodies.
// The browser encrypts the payload with a random AES-256-GCM key, then wraps
// that key with the server's RSA public key (OAEP/SHA-256) and sends
// { __encrypted: true, enc, iv, data }. Here we unwrap the AES key, decrypt
// the JSON and replace req.body with the original object.
//
// Plain (unencrypted) bodies — from Postman/curl/older clients — pass
// through untouched, so everything stays backward compatible.
const decryptBody = (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== "object" || body.__encrypted !== true) {
    return next();
  }

  try {
    req.body = decryptJsonBody(body);
    return next();
  } catch (error) {
    return next(
      error instanceof ApiError
        ? error
        : new ApiError(400, "Failed to decrypt the request payload"),
    );
  }
};

export default decryptBody;