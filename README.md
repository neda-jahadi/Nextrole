# NextRole

NextRole is a production-style full-stack job platform built with **React, TypeScript, Node.js, Express, Prisma, and PostgreSQL**.

The project is designed to demonstrate modern full-stack engineering practices across frontend architecture, backend APIs, authentication and authorization, security, accessibility, and production deployment.

> 🚧 **Status:** NextRole is under active development and is already deployed for production testing.

## ✨ Features

- Search jobs by title with debounced search
- Filter jobs by region and municipality
- Filter by job type and work mode
- URL-based search and filter state
- Pagination for job listings
- User registration and password authentication
- Google sign-in with OAuth 2.0 / OpenID Connect
- Role-aware functionality for users, companies, and administrators
- Company account and approval flows
- Protected job creation and management for approved company accounts
- User profile functionality
- Schema-based form and API validation
- Responsive and accessible UI
- Reusable UI components and design-system patterns
- Dark/light theme support
- REST API integration between frontend and backend

## 🛠 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- React Hook Form
- Zod
- Tailwind CSS
- Storybook
- React Icons / Lucide React

### Backend

- Node.js
- Express 5
- Prisma ORM
- PostgreSQL
- REST APIs
- JWT authentication
- Google OAuth / OpenID Connect
- Zod request validation
- Helmet
- express-rate-limit

### Testing & Development

- Vitest
- Playwright
- ESLint
- Prettier
- Husky
- Storybook

## 🏗 Architecture

NextRole uses separate frontend and backend applications:

```text
Nextrole/
├── client/          # React + TypeScript frontend
├── server/          # Node.js + Express backend
├── .husky/          # Git hooks and pre-commit checks
├── .vscode/         # Shared VS Code configuration
├── package.json     # Root development tooling
└── README.md
```

The application follows a layered full-stack flow:

```text
React / TypeScript
        ↓
     REST API
        ↓
Node.js / Express
        ↓
      Prisma
        ↓
   PostgreSQL
```

In production, browser requests to `/api/*` use the frontend deployment as the browser-facing origin and are rewritten to the separately deployed Express API. This keeps the client API contract simple while allowing the frontend and backend to be deployed independently.

## 🎨 Frontend

The frontend is built around reusable components, server-state management, accessible interaction patterns, and consistent UI behavior.

Reusable components include:

- Input and SearchInput
- Autocomplete
- MultiSelect
- Pagination
- Button and ButtonGroup
- ButtonLink
- Drawer
- Alert
- Form fields and validation states

Accessibility, responsive design, keyboard interaction, focus states, error feedback, and reusable styling are considered throughout the UI.

Authentication state is restored from the backend when the application loads, and navigation and protected functionality adapt to the authenticated user's role.

## 🔎 Job Search & Filtering

The job-search experience supports:

- Job title
- Region
- Municipality
- Job type
- Work mode

Filter state is synchronized with URL search parameters so searches can survive navigation and be shared through URLs.

Job-title searches use debouncing to avoid unnecessary API requests. Server state is managed with **TanStack React Query** for fetching, caching, mutation handling, and synchronization with the backend.

## 📝 Forms & Validation

Forms use **React Hook Form** and **Zod** for schema-based validation.

Reusable form patterns provide:

- Consistent labels
- Required-field indicators
- Validation messages
- Invalid states
- Accessible error associations

The backend also validates incoming requests instead of relying on client-side validation as a security boundary.

## 🔐 Authentication & Authorization

NextRole supports both password-based authentication and Google sign-in.

### Application sessions

After authentication, the API issues a NextRole JWT in an **HttpOnly cookie**. Production cookies use HTTPS-only delivery and `SameSite=Lax` behavior.

Authentication state is restored through the authenticated `/me` API rather than exposing the JWT to frontend JavaScript.

### Google OAuth / OpenID Connect

Google authentication uses the authorization-code flow with server-side processing:

```text
NextRole
   ↓
Google authorization
   ↓
Authorization code callback
   ↓
Server-side token exchange
   ↓
ID-token verification
   ↓
NextRole user / AuthAccount
   ↓
NextRole JWT session
```

The flow includes OAuth state validation, ID-token audience verification, verified-email checks, and mapping the stable Google account identifier to an internal NextRole user.

### Authorization

Frontend route guards provide role-aware navigation and UX, while sensitive permissions are enforced again by the backend.

Examples include:

- Authenticated-user routes
- Administrator-only functionality
- Company-only functionality
- Approved-company checks before job creation
- Server-side role authorization

Backend authorization is treated as the security boundary rather than relying on hidden UI elements.

## 🛡 Security

Security is being developed as a first-class part of the project rather than added only at the end.

Current protections include:

- HttpOnly JWT cookies
- Secure cookies in production
- `SameSite=Lax` session cookies
- Password hashing
- Server-side JWT verification
- Server-side role and company-status authorization
- OAuth state validation
- Google ID-token verification
- Request/schema validation
- Login rate limiting to reduce brute-force and credential-stuffing attempts
- Separate registration rate limiting to reduce account-creation abuse
- HTTP security headers using **Helmet**
- Environment-based secret management

The security work is being reviewed against common web-security and **OWASP** principles as the project evolves.

## 🗄 Data Layer

The backend uses **Prisma ORM** with **PostgreSQL**.

The data model supports users, company-related data, jobs, and external authentication identities. Google identities are represented separately from the core user record so authentication providers can be mapped to internal application users without making the external provider the application's user model.

Prisma migrations are used to evolve the relational schema.

## 🧩 Component Development

Reusable UI components are developed and documented with **Storybook**, helping maintain visual and behavioral consistency and allowing components to be developed independently.

## ✅ Code Quality

The project uses automated development tooling to maintain consistency:

- ESLint for static analysis
- Prettier for formatting
- Husky for Git pre-commit hooks
- TypeScript for type safety
- Storybook for isolated component development
- Vitest and Playwright available as the testing foundation

Automated test coverage is one of the project's active development areas.

## 🚀 Deployment

The frontend and backend are deployed separately on **Vercel**.

Production API traffic is exposed to the browser through the frontend's `/api/*` path and rewritten to the Express backend. Authentication cookies therefore work through the same browser-facing application origin while the services remain independently deployable.

## 💻 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/neda-jahadi/Nextrole.git
cd Nextrole
```

### 2. Install root development dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

From the project root:

```bash
cd server
npm install
```

### 5. Configure environment variables

The project includes `.env.example` files for the client and server.

Create local `.env` files based on those examples. The client requires its local API configuration, while the server requires values such as the PostgreSQL connection, application authentication secrets, and Google OAuth configuration.

> 🔒 Never commit `.env` files, database credentials, OAuth client secrets, or JWT secrets.

### 6. Set up the database

Make sure PostgreSQL is running and `DATABASE_URL` points to your local database.

From `server`:

```bash
npx prisma generate
npx prisma migrate dev
```

### 7. Start the backend

```bash
cd server
npm run dev
```

### 8. Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Open the URL displayed by Vite.

## 📌 Current Development

NextRole is being developed iteratively toward a production-ready portfolio application.

Current and upcoming engineering work includes:

- Continued application security and OWASP review
- Automated unit and component testing with Vitest
- Backend integration testing
- End-to-end testing with Playwright
- Docker-based local development
- CI/CD with GitHub Actions
- Observability and production monitoring
- Architecture documentation
- Further production hardening

## 👩‍💻 Author

**Neda Jahadi**

Full-stack developer focused on React and TypeScript applications, backend/API development, accessible user experiences, and modern software-engineering practices.

- LinkedIn: https://www.linkedin.com/in/neda-jahadi-38917117a/
- GitHub: https://github.com/neda-jahadi
