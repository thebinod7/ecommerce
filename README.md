# E-Commerce Backend

Online shopping made easy.

## Run Locally

Setp 1: Clone the project

```bash
https://github.com/thebinod7/ecommerce.git
```

Step 2: Go to the project directory and install dependencies

```bash
  cd ecommerce
  pnpm install
```

Step 3: Setup Postgres Database

```bash
  docker compose up -d
```

Also add env variables

```bash
PORT=5000

DB_HOST=localhost
DB_PORT=6543
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=db_ecommerce

DATABASE_URL=postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public

```

Step 4: Run Prisma Migration

```bash
   npx prisma migrate dev
```

Step 4: Run Project

```bash
   pnpm dev
```

App running at:

```bash
http://localhost:5000
```

\*Note: You can use `npm` `yarn` or `pnpm`
