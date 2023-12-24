# message-api

## Description

Simple [Nest](https://github.com/nestjs/nest) application that implements and API for incoming and outgoing messages.

The app needs to connect to a MySQL instance in startup (default port 3306). You may want to run the following command to have such an instance before starting the app.

```bash
$ docker-compose -f mysql-docker-compose.yml up
```

I chose the old TypeORM (over Prisma and Sequelize) for some reasons:

- I already had some experience with TypeORM (and PostgreSQL)
- I don't remember which one was preferred
- It provides a SQL builder

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Go to `http://localhost:3000/api` to check the endpoints.

## Basic testing:

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Integration/e2e testing

These tests needs to connect to the MySQL instance in startup. You may want to run the following command before starting the app.

```bash
$ docker-compose -f mysql-docker-compose.yml up
```

```bash
# e2e tests
$ npm run test:e2e
```
