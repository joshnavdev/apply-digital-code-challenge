# Product Service API

This project is an API built with **NestJS** and **PostgreSQL**, exposing endpoints for product management and reporting.

---

## Main Endpoints

- **Products**
    - `GET /api/products` → Get all products
    - `DELETE /api/products/:id` → Delete a product by ID

- **Reports**
    - `GET /api/reports/:reportType` → Get a report by type

For more details, check the Swagger documentation at:  
[`http://localhost:3000/api/docs`](http://localhost:3000/api/docs)

---

## Requirements

- [Node.js **v22**](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (package manager)
- [Docker & Docker Compose](https://docs.docker.com/compose/)

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/joshnavdev/apply-digital-code-challenge
   cd apply-digital-code-challenge
   ```

2. Create your .env file based on the example and edit it to the correct values:

   ```bash
     cp .env.example .env
   ```
   
3. Install dependencies (only needed if running outside Docker):

    ```bash
    pnpm install
    ```
   
---

## Run the Project

Run the following command to start PostgreSQL and the API:

```bash
    docker-compose up -d --build
```

The API will be available at: [`http://localhost:3000`](http://localhost:3000)

---

## Authentication for Reports

To test the Reports API, you need a JWT token signed with the JWT_SECRET defined in your .env.

You can easily generate one using this tool:
👉 https://jwtsecrets.com/tools/jwt-encode

Use your project’s JWT_SECRET as the signing key.

Example payload:
```json
{
  "userId": 1,
  "role": "admin"
}
```

Copy the generated token and include it in your requests (e.g., Authorization: Bearer <token>).

---
## Services included in docker-compose

- Postgres on port 5432
- NestJS API on port 3000