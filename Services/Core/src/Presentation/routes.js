import express from 'express';
import userRouter from "./user.js";
import groupRouter from "./group.js";
import channelRouter from "./channel.js";
import directRouter from "./direct.js";
import { auth } from '../Application/authorization/auth.js';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../Application/utilities/swagger_output.json" with { type: 'json' };
import swaggerDocument2 from "../../../IAM/src/application/utilities/swagger_output.json" with { type: 'json' };
const router = express.Router();
function convertToOpenApi3(paths) {
    const convertedPaths = {};
    for (const [path, methods] of Object.entries(paths)) {
      convertedPaths[path] = {};
      for (const [method, details] of Object.entries(methods)) {
        const newDetails = { ...details };
        if (details.parameters) {
          const bodyParam = details.parameters.find(p => p.in === 'body');
          if (bodyParam) {
            newDetails.requestBody = {
              required: bodyParam.required || false,
              content: {
                'application/json': {
                  schema: bodyParam.schema,
                },
              },
            };
            newDetails.parameters = details.parameters.filter(p => p.in !== 'body');
          }
        }
        convertedPaths[path][method] = newDetails;
      }
    }
    return convertedPaths;
  }
  
const combinedSwaggerDocs = {
    openapi: '3.0.0',
    // swagger: '3.0',
    info: {
      title: 'Combined API Docs',
      version: '1.0.0',
      description: 'Merged API documentation from two services.',
    },
    servers: [
      {
        url: 'https://192.168.151.23:3001',
        description: 'Service 1 (User Management)',
      },
      {
        url: 'https://192.168.151.23:3003',
        description: 'Service 2 (Other Features)',
      },
    ],
    paths: {
        ...convertToOpenApi3(swaggerDocument.paths),
        ...convertToOpenApi3(swaggerDocument2.paths)
    },
  };
  
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(combinedSwaggerDocs,{
    swaggerOptions: {
      withCredentials: true, // Enables sending cookies
    },
  }));
router.use("/users",(req,res,next) => auth(req,res,next,["user"]),userRouter);
router.use("/groups",(req,res,next) => auth(req,res,next,["user"]),groupRouter);
router.use("/channels",(req,res,next) => auth(req,res,next,["user"]),channelRouter);
router.use("/directs",(req,res,next) => auth(req,res,next,["user"]),directRouter);

export default router;