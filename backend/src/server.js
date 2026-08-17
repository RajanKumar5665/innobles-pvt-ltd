import "dotenv/config";

import connectDB from "./config/db.js";
import createApp from "./app.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    const app = createApp();
    const server = app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT} [${process.env.NODE_ENV || "development"}]`,
      );
    });

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
