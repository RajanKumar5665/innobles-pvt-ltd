/**
 * Wrap an async controller/route handler and forward any rejected promise
 * to Express's error middleware — no repeated try/catch blocks needed.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
