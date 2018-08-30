import { Route } from "foxify";
import { BookController } from "../Controllers";

const route = new Route("/books");

// Get all books
route.get("/", BookController.index);

// Get an specific book
route.get("/:id", BookController.show);

// Create a book
route.post("/", BookController.store);

// Update an specific book
route.put("/:id", BookController.update);

// Delete an specific book
route.delete("/:id", BookController.remove);

// Restore a deleted book
route.post("/:id/restore", BookController.restore);

export default route;
