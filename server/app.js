const express = require("express");
const logger = require("morgan");

const dbModule = require("./dbModule");
const indexRouter = require("./routes/index");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(logger("dev"));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Closing database...");
  dbModule.closeConnection(() => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing database...");
  dbModule.closeConnection(() => {
    process.exit(0);
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err.message);
  dbModule.closeConnection(() => {
    process.exit(1);
  });
});
