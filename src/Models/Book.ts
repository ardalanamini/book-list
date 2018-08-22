import Odin from "@foxify/odin";

module Book {
  export interface Schema {
    name: string;
    pageCount: number;
  }
}

/**
 * Book database model
 */
class Book extends Odin<Book.Schema> {
  /**
   * Collection validation schema
   */
  static schema = {
    name: Odin.Types.String.required,
    pageCount: Odin.Types.Number.integer.positive.required,
  };

  /**
   * Don't actually delete documents from the database collection
   */
  static softDelete = true;
}

export default Book;
