import express from "express";
import { initialize } from "express-openapi";
import apiDoc from "../api-doc";
import * as bodyParser from "body-parser";
import { createDb, openDb } from "./Db/db";

const port = 7080;

const setupDb = async function () {
  console.log("setting up db")
  const connection = await openDb()
  createDb(connection)
}

const app: express.Express = express();

app.use(bodyParser.json());

console.log("about to initialize");
initialize({
  validateApiDoc: false,
  app,
  apiDoc: apiDoc,
  paths: "./src/paths",
  routesGlob: "*****.{ts,js}", // updated default to allow .ts
  routesIndexFileRegExp: /(?:index)?\.[tj]s$/, // updated default to allow .ts
});

app.use((err, req, res, next) => {
  console.error(`Error in path ${req.path}:`, err);
  res.status(500).send('Something broke!');
});

console.log("initialized");
if (port) {
  setupDb().then(() => {
    console.log("about to listen");
    app.listen(port);
    console.log("listening");
  })
  
}