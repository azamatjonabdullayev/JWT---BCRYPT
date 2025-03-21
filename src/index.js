import "dotenv/config";
import express from "express";
import allRoutes from "./routes/all.routes.js";

const server = express();

server.use(express.json());
server.use("/api", allRoutes());

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
