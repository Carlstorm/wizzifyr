/* Node.js libraries */
import path from "path";

/* External libraries */
import express from "express";
import morgan from "morgan";
import cors from "cors";

/* Local files */
import userRoutes from "./routes/userRoutes.js";
import wishRoutes from "./routes/wishRoutes.js";

function createServer() {
  const app = express();

  app.use(express.json({limit: '50mb'}));

  app.use(express.urlencoded({extended: false}));

  app.use(morgan("combined"));

  app.use(cors());

  app.use(express.static(path.resolve("..", "client", "build")));

  app.use("/api/wishes", wishRoutes);
  app.use("/api/users", userRoutes);

  app.get("*", (req, res) =>
    res.sendFile(path.resolve("..", "client", "build", "index.html"))
  );

  return app;
}

export default createServer;
