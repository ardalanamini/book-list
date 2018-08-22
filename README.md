# Book List

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Urls](#urls)
  - [Testing](#testing)
- [Author](#author)
- [Packages](#packages)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) 8 or higher is required.
- [MongoDB](https://www.mongodb.com//download-center) running on the machine, including the database entered in the `.env` file.

### Installation 

```bash
npm install
```

### Usage

Build the app

```bash
npm run build
```

Set environment variables

```bash
cp .env.example .env
```

Start server

```bash
npm start
```

#### Urls

- <http://localhost:8020/v1> (`GET`) basic information about the api (name & version)
- <http://localhost:8020/v1/query> (`*`) GraphQL (GraphiQL enabled for demo)

### Testing

```bash
npm test
```

## Author

**Ardalan Amini** - [@ardalanamini](https://github.com/ardalanamini)

## Packages

These used packages are written by me

- [Foxify](https://github.com/foxifyjs/foxify) - fairly stable
- [Odin](https://github.com/foxifyjs/odin) - beta mode
- [Prototyped.js](https://github.com/ardalanamini/prototyped.js) - stable (fully tested)
