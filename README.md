<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# TapUp - BE

## Table of Contents

- [TapUp - BE](#tapup---be)
  - [Table of Contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [ENV Fields](#env-fields)
  - [What's included?](#whats-included)
    - [VSCode Workspace Settings](#vscode-workspace-settings)
    - [Commitlint](#commitlint)
    - [Docker](#docker)
    - [ESLint](#eslint)
    - [Husky](#husky)
    - [Lint-staged](#lint-staged)
    - [Prettier](#prettier)
  - [Running the app](#running-the-app)
    - [development](#development)
  - [Test](#test)
    - [unit tests](#unit-tests)
    - [e2e tests](#e2e-tests)
    - [test coverage](#test-coverage)
  - [Docker Notes](#docker-notes)
  - [Further help](#further-help)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/lang/en/)
- [Docker](https://docs.docker.com/get-docker/)

### Installation

1. Clone the git repository

   ```bash
   git clone https://github.com/Acetylcholine007/tapup-be.git
   ```

2. Go into the project directory

   ```bash
   cd tapup-be
   ```

3. Checkout working branch

   ```bash
   git checkout dev
   ```

4. Install dependencies

   ```bash
   yarn
   ```

5. Create `.env`

   ```bash
   touch .env
   ```

6. Replace the values of the variables with your own

## ENV Fields

```bash
# App
APP_PORT=3000
APP_NAME=TapUp
API_VERION=1.0.0
NODE_ENV=development

# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

# JWT
JWT_SECRET=YOUR_SECRET_KEY_HERE
JWT_TOKEN_AUDIENCE=localhost:3000
JWT_TOKEN_ISSUER=localhost:3000
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400

# CORS
CORS_WHITELIST=https://localhost:3000
CORS_ALLOWED_HEADERS=Access-Control-Allow-Headers,Origin,X-Requested-With,Content-Type,Accept,Authorization
CORS_EXPOSED_HEADERS=
```

## What's included?

### VSCode Workspace Settings

Performs auto code formatting, unused import removal and import sorting on save.

**Configuration file**: [`settings.json`](./.vscode/settings.json)

---

### Commitlint

[commitlint](https://github.com/conventional-changelog/commitlint) checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

**Configuration file**: [`.commitlintrc.json`](./.commitlintrc.json).

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional
```

---

### Docker

**Docker file**: [`Dockerfile`](./Dockerfile)  
**Docker Ignore**: [`.dockerignore`](./.dockerignore)  
**Compose file**: [`docker-compose.yml`](./docker-compose.yml).

Containers :

- PostgreSQL
- Redis
- Server

Compose file uses `.env` and volumes setup.

---

### ESLint

[ESLint](https://eslint.org/) is a fully pluggable tool for identifying and reporting on patterns in JavaScript.

**Configuration file**: [`.eslintrc.js`](./.eslintrc.js).

For more configuration options and details, see the [configuration docs](https://eslint.org/docs/user-guide/configuring).

---

### Husky

[Husky](https://github.com/typicode/husky) is a package that helps you create Git hooks easily.

**Configuration folder**: [`.husky`](./.husky/).

---

### Lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) is a Node.js script that allows you to run arbitrary scripts against currently staged files.

**Configuration file**: [`lint-staged.config.js`](./lint-staged.config.js).

---

### Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter.

**Configuration file**: [`.prettierrc.json`](./.prettierrc.json).  
**Ignore file**: [`.prettierignore`](./.prettierignore).

For more configuration options and details, see the [configuration docs](https://prettier.io/docs/en/configuration.html).

## Running the app

### development

```bash
docker-compose up -d
```

## Test

### unit tests

```bash
yarn test
```

### e2e tests

```bash
yarn test:e2e
```

### test coverage

```bash
yarn test:cov
```

---

## Docker Notes

To run build, migrations and seeders in a dockerized setup, you need to connect to the server container via sh:

```bash
# Default
$ docker exec -it tapup-be-server-1 sh

# If the server container has a different name, use container ID instead.
$ docker ps -a

# Connect to the server container's shell
$ docker exec -it <containerID> sh

# Exit the sh through Ctrl + D
```

---

## Further help

To get more help on the Nest CLI use `nest --help` or go check out the [Nest CLI README](https://github.com/nestjs/nest-cli/blob/master/README.md).
