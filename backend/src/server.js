import "dotenv/config";

import connectDB from "./config/db.js";
import createApp from "./app.js";

const PORT = process.env.PORT || 5000;

// Don't let the server start in production if JWT_SECRET is missing or too short.
const assertSecureConfig = () => {
  if (process.env.NODE_ENV === "production") {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
      throw new Error(
        "JWT_SECRET must be set to at least 32 characters in production",
      );
    }
  }
};

const start = async () => {
  try {
    assertSecureConfig();
    await connectDB();
    const app = createApp();
    const server = app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT} [${process.env.NODE_ENV || "development"}]`,
      );
    });

    // Close the server cleanly when the process is stopped (Ctrl+C, deploy restart, etc.)
    const shutdown = () => {
      server.close(() => process.exit(0));
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();