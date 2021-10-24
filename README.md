# mood-api

Серверная часть приложения "Трекер настроения".

Когда то была написана на JS+Koa, теперь пришло время наводить тут порядок.
Может, когда нибудь это случится и с клиентской частью, пока что просто сделал ее совместимой с новым API.

Перед запуском необходимо:
- запустить MongoDB
- установить нужные параметры в файл `.env` (пример в `.env.example`)

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
