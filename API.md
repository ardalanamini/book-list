# Book List

## Table of Contents <!-- omit in toc -->

- [Get Books](#get-books)
- [Get Book](#get-book)
- [Store Book](#store-book)
- [Update Book](#update-book)
- [Delete Book](#delete-book)
- [Restore Book](#restore-book)

## Get Books

url: `/v1/books` (`GET`)

| Query String | Type             | Description                         |
| :----------: | :--------------: | :---------------------------------: |
| offset       | [Number][number] | positive integer                    |
| limit        | [Number][number] | positive integer                    |
| sort         | [Number][number] | in `[field name]:[asc|desc]` format |

*Example Request*:

- GET `/v1/books?offset=5&limit=10&sort=pageCount:desc`

*Example Response*:

```http
HTTP/1.1 200 Ok

{
  "books": [
    {
      "id": "5b7c3882106f51665b480254",
      "name": "Book 1",
      "pageCount": 200,
      "created_at": "2018-08-22T09:56:56.532Z"
    },
    ...
  ]
}
```

## Get Book

url: `/v1/books/:id` (`GET`)

*Example Request*:

- GET `/v1/books/5b7c3882106f51665b480254`

*Example Response*:

```http
HTTP/1.1 200 Ok

{
  "book": {
    "id": "5b7c3882106f51665b480254",
    "name": "Book 1",
    "pageCount": 200,
    "created_at": "2018-08-22T09:56:56.532Z"
  }
}
```

## Store Book

url: `/v1/books` (`POST`)

| Param | Type | Description |
|:-----:|:----:|:-----------:|
| book | [Book](#book) | - |

### Book <!-- omit in toc -->

| Param | Type | Description |
|:-----:|:----:|:-----------:|
| name | [String][string] | Book's name |
| pageCount | [Number][number] | Book's page count |

*Example Request*:

- POST `/v1/books`

```json
{
  "book": {
    "name": "Book 2",
    "pageCount": 100
  }
}
```

*Example Response*:

```http
HTTP/1.1 200 Ok

{
  "book": {
    "id": "5b7c03b43c9c237488a41fe6",
    "name": "Book 2",
    "pageCount": 100,
    "created_at": "2018-08-30T14:13:50.454Z"
  }
}
```

## Update Book

url: `/v1/books/:id` (`PUT`)

| Param | Type | Description |
|:-----:|:----:|:-----------:|
| book | [Book](#book) | - |

*Example Request*:

- PUT `/v1/books/5b7c3882106f51665b480254`

```json
{
  "book": {
    "pageCount": 375
  }
}
```

*Example Response*:

```http
HTTP/1.1 200 Ok

{
  "book": {
    "id": "5b7c3882106f51665b480254",
    "name": "Book 1",
    "pageCount": 375,
    "created_at": "2018-08-22T09:56:56.532Z",
    "updated_at": "2018-08-30T14:04:34.218Z"
  }
}
```

## Delete Book

url: `/v1/books/:id` (`DELETE`)

*Example Request*:

- DELETE `/v1/books/5b7c3882106f51665b480254`

*Example Response*:

```http
HTTP/1.1 200 Ok

{
  "message": "Removed successfully"
}
```

## Restore Book

url: `/v1/books/:id/restore` (`POST`)

*Example Request*:

- POST `/v1/books/5b7c3882106f51665b480254/restore`

*Example Response*:

```http
HTTP/1.1 200 Ok

{
  "book": {
    "id": "5b7c3882106f51665b480254",
    "name": "Book 1",
    "pageCount": 375,
    "created_at": "2018-08-22T09:56:56.532Z",
    "deleted_at": null,
    "updated_at": "2018-08-30T14:04:34.218Z"
  },
  message: "Restored successfully"
}
```

[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number