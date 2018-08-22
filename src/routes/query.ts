import { Route } from "foxify";
import Odin from "@foxify/odin";
import * as models from "../Models";
import * as expressGraphql from "express-graphql";

/**
 * Auto generate GraphQL schema
 */
const schema = Odin.GraphQL(...models.$values());

const route = new Route();

/**
 * Query database models via GraphQL
 */
route.use("/query", expressGraphql({ schema, graphiql: true }) as any);

export default route;
