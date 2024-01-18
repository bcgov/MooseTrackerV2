import { Operation } from "express-openapi";
import { RequestHandler } from "express";
import { openDb, insertSightingMoose } from "../Db/db";

function postMooseSightings(): RequestHandler {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      const dbConnection = await openDb();
      insertSightingMoose(dbConnection, req.body);
      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  };
}

export const POST: Operation = postMooseSightings();

POST.apiDoc = {
  summary: "Uploads moose group sighting data",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            sightings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  dateOfSighting: {
                    type: "number",
                  },
                  status: {
                    type: "string",
                  },
                  syncDate: {
                    type: "number",
                  },
                  location: {
                    type: "array",
                    items: {
                      type: "number",
                      maxLength: 2,
                      minLength: 2,
                    },
                  },
                  mooseArray: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "number",
                        },
                        age: {
                          type: "string",
                        },
                        gender: {
                          type: "string",
                        },
                      }
                    }
                  },
                }
              }
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "A success response",
      // schema: {
      //   type: "json",
      //   properties: {},
      // },
    },
    default: {
      description: "An error occurred",
      // schema: {
      //   additionalProperties: true,
      // },
    },
  },
};