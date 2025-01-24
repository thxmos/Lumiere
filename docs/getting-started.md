# Getting Started

## 1. Setting up the repo

1. After cloning the repo, run `npm install`
2. Copy `.env.template` to `.env` and fill in the environment variables
3. In `src/constants/app.ts`, update `APP_NAME`, `APP_DESCRIPTION`, and `APP_DOMAIN`
4. Run `npm run dev`

## 2. Setting up the database

1. Run `npx prisma migrate dev` to create the database and apply the migrations
2. Run `npx prisma db seed` to seed the database with the default data
