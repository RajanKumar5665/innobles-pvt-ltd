import { decryptJsonBody } from "../utils/crypto.js";
import { ApiError } from "../utils/apiResponse.js";


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