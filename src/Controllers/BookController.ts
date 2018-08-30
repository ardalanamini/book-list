import { Route } from "foxify/framework/routing";
import { Book } from "../Models";

/**
 * Get all books
 * @param {Foxify.Request} req
 * @param {Foxify.Response} res
 */
export const index: Route.Controller = async (req, res) => {
  const { sort, offset, limit } = req.query;

  let books;

  if (sort) books = (Book.orderBy as any)(...sort.split(":"));
  else books = Book.orderBy("created_at", "desc");

  if (offset) books = books.offset(+offset);

  if (limit) books = books.limit(+limit);

  res.json({ books: await books.get() });
};

/**
 * Get an specific book
 * @param {Foxify.Request} req
 * @param {Foxify.Response} res
 * @param {(()=>void)} next
 * @param {String} id - book id
 */
export const show: Route.Controller = async (req, res, next, id) => {
  const book = await Book.find(id);

  res.json({ book });
};

/**
 * Create a book
 * @param {Foxify.Request} req
 * @param {Foxify.Response} res
 */
export const store: Route.Controller = async (req, res) => {
  const book = await Book.create((req as any).body.book);

  res.json({ book });
};

/**
 * Update an specific book
 * @param {Foxify.Request} req
 * @param {Foxify.Response} res
 * @param {(()=>void)} next
 * @param {String} id - book id
 */
export const update: Route.Controller = async (req, res, next, id) => {
  await Book.where("id", id).update((req as any).body.book);

  const book = await Book.find(id);

  res.json({ book });
};

/**
 * Delete an specific book
 * @param {Foxify.Request} req
 * @param {Foxify.Response} res
 * @param {(()=>void)} next
 * @param {String} id - book id
 */
export const remove: Route.Controller = async (req, res, next, id) => {
  await Book.destroy(id);

  res.json({ message: "Removed successfully" });
};

/**
 * Restore a deleted book
 * @param {Foxify.Request} req
 * @param {Foxify.Response} res
 * @param {(()=>void)} next
 * @param {String} id - book id
 */
export const restore: Route.Controller = async (req, res, next, id) => {
  await Book.where("id", id).restore();

  const book = await Book.find(id);

  res.json({ book, message: "Restored successfully" });
};
