# iZhinga Backend (Express + TypeScript)

This repository contains the backend implementation for the **iZhinga AI-powered travel platform**.  
It is built with **Express.js + TypeScript**, follows a modular structure, and supports extensibility, scalability, and observability.

---

## 📂 Project Structure

```
izh-backend/
│── src/
│   ├── config/            # Config & environment settings
│   ├── common/            # Middleware, utilities, constants
│   ├── modules/           # Feature-based modules (auth, itinerary, budget, etc.)
│   ├── database/          # Entities, repositories, migrations
│   ├── observability/     # Logging, metrics, tracing
│   ├── swagger/           # Swagger/OpenAPI setup
│   └── main.ts            # Application entrypoint
│
├── test/                  # Unit & integration tests
├── Dockerfile             # Backend Docker image
├── docker-compose.yml     # Multi-container setup (backend + redis + nginx)
├── nginx.conf             # NGINX reverse proxy config
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript compiler config
└── README.md              # Documentation
```

---

## 🚀 Features

  - CI/CD ready with Docker
  - Authentication (OAuth2.0 + JWT + RBAC)
  - PostgreSQL + Redis setup
  - NGINX reverse proxy
  - Centralized error handling & observability

  - AI-driven Itinerary Generation APIs
  - Budget Optimization Engine
  - External API Integrations (Maps, Weather, Events)
  - Real-Time POI Fetchers
  - Redis-based caching & enrichment
  - Shopping & Packing recommendations

---

## 🛠️ Tech Stack

- **Language**: Node.js (TypeScript)  
- **Framework**: Express.js  
- **Database**: PostgreSQL + Redis  
- **Auth**: OAuth2.0, JWT, RBAC  
- **API Gateway**: NGINX  
- **Docs**: Swagger (OpenAPI 3.0)  
- **Observability**: Prometheus, Jaeger, OpenTelemetry  
- **Containerization**: Docker + Docker Compose  

---

## 📖 API Documentation

Swagger is available at:  
```
http://localhost:3000/docs
```

---

## ⚙️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/izh-backend.git
   cd izh-backend/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Docker services (Postgres, Redis, NGINX):
   ```bash
   docker-compose up -d
   ```

4. Run backend in development mode:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## 🧪 Testing

Run unit and integration tests:
```bash
npm run test
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root with values such as:
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/izhdb
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
```
