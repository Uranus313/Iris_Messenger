import config from "config";

export const port = config.get("app.port");
export const dbName = config.get("db.mongo.name");
export const dbHost = config.get("db.mongo.host");
export const dbUsername = config.get("db.mongo.username");
export const dbPassword = config.get("db.mongo.password");
export const dbPort = config.get("db.mongo.port");