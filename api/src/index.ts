import express from "express";
import { initialize } from "express-openapi";
import apiDoc from "../api-doc";
import bodyParser from "body-parser"; // use modern import
import { createDb, openDb } from "./Db/db"; // make sure paths are correct
import cors from "cors"; // use modern import
import path from "path"; // for resolving paths

const port = 7080;

const setupDb = async function () {
  console.log("setting up db");
  createDb();
};

const app: express.Express = express();

app.use(
  cors({
    origin: "http://localhost:4173",
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Moose Sightings API!");
});

console.log("about to initialize");
initialize({
  validateApiDoc: false,
  app,
  apiDoc: apiDoc,
  paths: "./src/paths",
  routesGlob: "**/*.{ts,js}", // updated default to allow .ts
  routesIndexFileRegExp: /(?:index)?\.[tj]s$/, // updated default to allow .ts
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(`Error in path ${req.path}:`, err);
    res.status(500).send("Something broke!");
  }
);

console.log("initialized");
if (port) {
  setupDb()
    .then(() => {
      console.log("about to listen");
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    })
    .catch((error) => {
      console.error("Error setting up the database:", error);
    });
}
