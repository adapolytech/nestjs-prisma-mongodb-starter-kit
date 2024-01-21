# NestJS vs Prisma Starter Kit

## Tech stack

- NestJS
- Prisma
- GraphQL
- MongoDB

## Next step

- add email validation with Resend
- passport for authenticiation

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

```graphql
mutation account {
  accounts {
    register(
      input: {
        firstname: "Nuulest"
        lastname: "dev"
        email: "test.dev@gmail.com"
        password: "secret"
      }
    ) {
      ... on EmailExistError {
        __typename
        code
        message
      }
      ... on User {
        __typename
        firstname
        lastname
        id
        accountId
      }
    }
  }
}
```

## Installation

```bash
yarn
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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
