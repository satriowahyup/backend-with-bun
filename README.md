# Backend with Bun, ElysiaJS, and Drizzle ORM

This project is a high-performance backend initialized using Bun, ElysiaJS, and Drizzle ORM connected to MySQL/MariaDB.

## Prerequisites
- [Bun](https://bun.sh/) (latest version recommended)
- MySQL or MariaDB server

## Setup

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Environment Variables**
   Copy the example environment file and configure your database credentials:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your actual MySQL database credentials.

3. **Database Migrations**
   Generate and apply the database migrations:
   ```bash
   bun run db:generate
   bun run db:migrate
   # or to push schema directly without migration files:
   # bun run db:push
   ```

## Running the Server

Start the development server with hot-reload:
```bash
bun run dev
```

The server will start at `http://localhost:3000`.

## Features
- **ElysiaJS**: Fast web framework.
- **Drizzle ORM**: Type-safe database queries.
- **Swagger**: API documentation available at `http://localhost:3000/swagger`.
- **CORS**: Enabled by default.

## API Endpoints (Users)
- `GET /users`: Get all users
- `GET /users/:id`: Get a user by ID
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a user by ID
- `DELETE /users/:id`: Delete a user by ID
