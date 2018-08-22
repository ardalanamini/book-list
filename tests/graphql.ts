import * as utils from "prototyped.js/es6/methods";
import Odin from "@foxify/odin";
import { graphql } from "graphql";
import * as models from "../src/Models";

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_CONNECTION__: any;
    }
  }
}

const SCHEMA = Odin.GraphQL(...utils.object.values(models));

const Book = models.Book;
const TABLE = "books";
const ITEMS = [
  {
    name: "Book 1",
    pageCount: 387,
  },
  {
    name: "Book 2",
    pageCount: 220,
  },
  {
    name: "Book 3",
    pageCount: 220,
  },
  {
    name: "Book 4",
    pageCount: 465,
  },
];

beforeAll((done) => {
  Odin.connections({
    default: {
      driver: "MongoDB",
      database: global.__MONGO_DB_NAME__,
      connection: global.__MONGO_CONNECTION__,
    },
  });

  Odin.DB.table(TABLE).insert(ITEMS, (err) => {
    if (err) throw err;

    Odin.DB.table(TABLE).get((err, items) => {
      if (err) throw err;

      ITEMS.length = 0;

      ITEMS.push(...items);

      done();
    });
  });
});

afterEach((done) => {
  Odin.DB.table(TABLE).delete((err) => {
    if (err) throw err;

    Odin.DB.table(TABLE).insert(ITEMS, (err) => {
      if (err) throw err;

      done();
    });
  });
});

afterAll((done) => {
  Odin.DB.table(TABLE).delete((err) => {
    if (err) throw err;

    done();
  });
});

describe("Testing Graphql", () => {
  describe("Testing Query", () => {
    test("books", async () => {
      const query = `
        query Q {
          books {
            id
            name
            pageCount
          }
        }
      `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.books).toEqual(ITEMS);
    });

    test("books with pageCount = 220", async () => {
      const query = `
        query Q {
          books(pageCount: 220) {
            id
            name
            pageCount
          }
        }
      `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.books).toEqual(utils.array.where(ITEMS, "pageCount", 220));
    });

    test("books ordered by pageCount ASC", async () => {
      const query = `
        query Q {
          books(orderBy: pageCount_ASC) {
            id
            name
            pageCount
          }
        }
      `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.books).toEqual(utils.array.orderBy(ITEMS, "pageCount", "asc"));
    });

    test("books by offset 1 limited by 2 (pagination)", async () => {
      const query = `
        query Q {
          books(skip: 1, limit: 2) {
            id
            name
            pageCount
          }
        }
      `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.books).toEqual(utils.array.limit(utils.array.skip(ITEMS, 1), 2));
    });

    test("book named 'Book 1'", async () => {
      const query = `
        query Q {
          book(name: "Book 1") {
            id
            name
            pageCount
          }
        }
      `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.book).toEqual(utils.array.where(ITEMS, "name", "Book 1")[0]);
    });
  });

  describe("Testing Insert book/books", () => {
    test("create_book", async () => {
      const query = `
        mutation {
          create_book(data: {name: "Book 5", pageCount: 22}) {
            name
            pageCount
          }
        }
      `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.create_book).toEqual({ name: "Book 5", pageCount: 22 });
    });

    test("insert_books", async () => {
      const query = `
          mutation {
            insert_books(data: [{name: "Book 5", pageCount: 22}, {name: "Book 6", pageCount: 101}])
          }
        `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.insert_books).toBe(2);

      const query2 = `
        query {
          books {
            name
            pageCount
          }
        }
      `;

      const { data: data2 } = await graphql(SCHEMA, query2);

      const newItems = await Book.whereIn("name", ["Book 5", "Book 6"])
        .orderBy("created_at", "desc")
        .get();

      expect(data2.books)
        .toEqual(newItems.map((item: any) => ({ name: item.name, pageCount: item.pageCount }))
          .concat(ITEMS.map((item) => ({ name: item.name, pageCount: item.pageCount }))));
    });
  });

  describe("Testing Updating books", () => {
    test("update_books", async () => {
      const query = `
        mutation {
          update_books(query: {pageCount: 465}, data: {name: "Book Test"})
        }
      `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.update_books).toBe(ITEMS.filter((item) => item.pageCount === 465).length);

      const query2 = `
        query {
          books {
            id
            name
            pageCount
          }
        }
      `;

      const { data: data2 } = await graphql(SCHEMA, query2);

      expect(data2.books)
        .toEqual(ITEMS.map((item) => item.pageCount === 465 ? { ...item, name: "Book Test" } : item));
    });
  });

  describe("Testing Deleting books", () => {
    test("delete_books", async () => {
      const query = `
          mutation {
            delete_books(query: {pageCount: 465})
          }
        `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.delete_books).toBe(ITEMS.filter((item) => item.pageCount === 465).length);

      const query2 = `
        query {
          books {
            id
            name
            pageCount
          }
        }
      `;

      const { data: data2 } = await graphql(SCHEMA, query2);

      expect(data2.books).toEqual(ITEMS.filter((item) => item.pageCount !== 465));
    });
  });

  describe("Testing Restoring books", () => {
    test("restore_books", async () => {
      const query = `
          mutation {
            delete_books(query: {pageCount: 465})
          }
        `;

      const { data } = await graphql(SCHEMA, query);

      expect(data.delete_books).toBe(ITEMS.filter((item) => item.pageCount === 465).length);

      const query2 = `
        query {
          books {
            id
            name
            pageCount
          }
        }
      `;

      const { data: data2 } = await graphql(SCHEMA, query2);

      expect(data2.books).toEqual(ITEMS.filter((item) => item.pageCount !== 465));

      const query3 = `
        mutation {
          restore_books(query: {pageCount: 465})
        }
      `;

      const { data: data3 } = await graphql(SCHEMA, query3);

      expect(data3.restore_books).toBe(ITEMS.filter((item) => item.pageCount === 465).length);

      const query4 = `
        query {
          books {
            id
            name
            pageCount
          }
        }
      `;

      const { data: data4 } = await graphql(SCHEMA, query4);

      expect(data4.books).toEqual(ITEMS);
    });
  });
});
