import "prototyped.js/es6";
import * as Foxify from "foxify";
import * as Odin from "@foxify/odin";
import * as path from "path";
import routes from "./routes";

declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_NAME: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
    }
  }
}

/**
 * Parsing environment variables
 */
Foxify.dotenv(path.resolve(__dirname, "..", ".env"));

/**
 * Initiating database connection
 */
Odin.connections({
  default: {
      driver: "MongoDB",
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
  },
});

const server = new Foxify();

// Adding routes to server instance
server.use(routes);

export default server;
