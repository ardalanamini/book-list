import { Route } from "foxify";
import { name, version } from "../../package.json";
import booksRoutes from "./books";

/**
 * Prefixing all routes by version
 * @example
 * // "/v1"
 */
const route = new Route(`/v${version.split(".")[0]}`);

/**
 * Display a few details about api at the index page
 */
route.get("/", (req, res) => res.json({
  name,
  version,
}));

route.use(booksRoutes);

export default route;
