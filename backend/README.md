# Innobles Backend — REST API

Production-oriented REST API for the **Innobles Smart Technology Pvt. Ltd.** company website.

Built with:

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **Joi** validation
- **JWT** authentication stored in an **HttpOnly cookie**
- **bcryptjs** password hashing
- **express-rate-limit** (login / registration / public forms)
- **helmet**, **cors** (restricted origin)
- **multer** + **Cloudinary** (image & resume upload)

There is **no public authentication, no public signup, and no signup UI**. Only the **Admin Panel** (`/admin`) requires authentication. The **first admin is created via Postman** using a one-time setup endpoint — there is **no seed script**.

---

## Folder structure

```
backend/
├── src/
│   ├── config/          # db.js, cloudinary.js
│   ├── controllers/     # auth, blog, product, career, contact, application, home, dashboard
│   ├── middleware/      # auth, validate, error, notFound, rateLimit, upload
│   ├── models/          # Admin, Blog, Product, Career, Contact, JobApplication, HomeContent
│   ├── routes/          # per-resource public + admin routes
│   ├── validations/     # Joi schemas
│   ├── utils/           # asyncHandler, jwt, slugify, apiResponse, paginate
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in the values (see below)
```

### Environment variables

| Variable                | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `NODE_ENV`              | `development` or `production`                      |
| `PORT`                  | Server port (default `5000`)                       |
| `MONGODB_URI`           | MongoDB connection string (Atlas / local)          |
| `FRONTEND_URL`          | Allowed frontend origin — **must not** be `*`      |
| `JWT_SECRET`            | Secret used to sign admin JWTs (long random string)|
| `JWT_EXPIRES_IN`        | e.g. `1d`                                          |
| `JWT_COOKIE_NAME`       | Name of the HttpOnly cookie (default `token`)      |
| `ADMIN_SETUP_SECRET`    | Secret required by the one-time admin registration |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (image/resume upload)        |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                                  |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                               |

> Never commit `.env`. It is ignored by Git.

### MongoDB

Create a database (e.g. `innobles`) on MongoDB Atlas or locally, then set `MONGODB_URI`:

```env
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/innobles
```

---

## Running the server

```bash
npm run dev      # nodemon (development)
npm start        # node (production)
```

The API runs on `http://localhost:5000`.

**Health check:** `GET /api/health`

## Create the first admin (Postman) — NO seed script

The first admin is created through a protected **one-time** endpoint. There is no admin signup page and the React frontend does not call this endpoint.

1. Set `ADMIN_SETUP_SECRET` in `.env`.
2. Send the request below with the secret in the `x-admin-setup-secret` header.

**Request:**

```http
POST http://localhost:5000/api/admin/auth/register
Content-Type: application/json
x-admin-setup-secret: YOUR_ADMIN_SETUP_SECRET
```

```json
{
  "name": "Innobles Admin",
  "email": "admin@innobles.com",
  "password": "StrongPassword123!"
}
```

**Responses:**

- First admin → **201 Created** with `{ id, name, email, role }`
- If an admin already exists → **403** `{ "success": false, "message": "Admin registration is already completed" }`
- Wrong/missing setup secret → **403**
- Invalid data → **400** `Validation failed`

> The setup secret only authorizes creating the *first* admin. After one admin exists the endpoint is permanently disabled (enforced, not just by convention).

---

## Admin authentication flow

```text
/admin → Admin Login → POST /api/admin/auth/login → HttpOnly JWT cookie → Admin Dashboard
```

- **JWT is stored in an HttpOnly cookie** — never in `localStorage`/`sessionStorage`.
- Cookies are `httpOnly: true`, `secure: true`, `sameSite: none` in production; `sameSite: lax` + `httpOnly: true` in development.
- The frontend must send `withCredentials: true` on admin API requests.
- Passwords are hashed with **bcryptjs** (salt factor 12). The hash is never returned and never logged.

---

## API endpoints

### Public

| Method | Endpoint                                   | Description                             |
| ------ | ------------------------------------------ | --------------------------------------- |
| GET    | `/api/home`                                | Home content (published only)            |
| GET    | `/api/blogs`                               | Published blogs (paginated, search/category) |
| GET    | `/api/blogs/:slug`                         | Single published blog                    |
| GET    | `/api/products`                            | Published products (paginated, search)   |
| GET    | `/api/products/:slug`                      | Single published product                 |
| GET    | `/api/careers`                             | Open careers (paginated, filter/search)  |
| GET    | `/api/careers/:id`                         | Single open career                       |
| POST   | `/api/contact`                             | Submit a contact message                 |
| POST   | `/api/careers/:careerId/applications`      | Apply to an open job (multipart)         |

### Admin (protected — requires authenticated cookie)

| Method | Endpoint                        | Description                             |
| ------ | ------------------------------- | --------------------------------------- |
| POST   | `/api/admin/auth/register`      | One-time initial admin creation (secret)|
| POST   | `/api/admin/auth/login`         | Login → sets HttpOnly cookie            |
| POST   | `/api/admin/auth/logout`        | Clears the cookie                       |
| GET    | `/api/admin/auth/me`            | Current admin                           |
| GET    | `/api/admin/dashboard`          | Summary counts for the dashboard        |
| ·      | `/api/admin/blogs...`           | Blog CRUD + publish/unpublish          |
| ·      | `/api/admin/products...`        | Product CRUD + publish/unpublish       |
| ·      | `/api/admin/careers...`         | Career CRUD + open/close               |
| ·      | `/api/admin/contacts...`        | Contact messages + status               |
| ·      | `/api/admin/applications...`    | Job applications + status               |
| GET/PUT| `/api/admin/home`               | Read / update home content              |

Every admin management route is protected by `requireAdmin`.

---

## Pagination & filtering

List endpoints accept:

```text
?page=1&limit=10&search=...&category=...&status=...
```

- `limit` is capped at **50** (never unlimited).
- Blogs: `search`, `category`, `status` · Products: `search`, `status` · Careers: `search`, `department`, `location`, `jobType`, `status` · Contacts: `search`, `status` · Applications: `search`, `status`, `careerId`

Response shape:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [],
  "pagination": { "page": 1, "limit": 10, "total": 0, "totalPages": 0 }
}
```

---

## File upload

Images and resumes are handled with **multer (memory storage) → Cloudinary**; only the resulting `{ url, publicId }` is saved in MongoDB. Local filesystem paths are never exposed.

- **Images** (blogs, products, home hero): JPEG / PNG / WEBP / GIF, max 5 MB.
- **Resumes** (job applications): PDF / DOC / DOCX, max 8 MB — stored as `resume: { url, publicId, originalName }`.
- Replacing an image uploads the new asset, updates the record, then deletes the old asset.

Set the three `CLOUDINARY_*` variables to enable uploads.

---

## Security notes

- Passwords hashed with bcrypt; never returned or logged.
- JWT is HttpOnly; secret from the environment; payload is minimal (`sub`, `role`).
- Admin registration guarded by `ADMIN_SETUP_SECRET` **and** an admin-exists check **and** rate limiting.
- Strict rate limits: login (5/15 min/IP), registration (3/15 min/IP), contact & applications (10/15 min/IP).
- CORS restricted to `FRONTEND_URL` with `credentials: true`.
- `helmet` applied; request bodies limited to 2 MB.
- All inputs validated with Joi; Mongoose schema validation + indexes.
- Global error handler sanitizes responses (no stack traces in production).
- Roles supported (`admin`, `super-admin`) with an extensible `requireRole` guard.

---

## Development commands

```bash
npm run dev         # start with nodemon (auto-reload)
npm start           # start with node
node --check <file> # syntax-check a file
```

---

## Production notes

- Set `NODE_ENV=production`, a strong `JWT_SECRET` and `ADMIN_SETUP_SECRET`.
- Point `FRONTEND_URL` at your deployed frontend domain.
- `sameSite=None` + `secure` cookies (automatic in production) require HTTPS.
- `trust proxy` is enabled for reverse proxies.
- Do **not** commit `.env`.

---

## Postman testing checklist

1. `POST /api/admin/auth/register` (with `x-admin-setup-secret`) → **201**
2. Same request again → **403** (already completed)
3. Wrong secret → **403**
4. Invalid registration body → **400** `Validation failed`
5. `POST /api/admin/auth/login` → **200** + `Set-Cookie` (HttpOnly)
6. `GET /api/admin/auth/me` → authenticated admin
7. `POST /api/admin/auth/logout` → cookie cleared
8. Any `/api/admin/*` without login → **401**
9. Blog / Product / Career CRUD (create, read, update, publish/unpublish or open/close, delete)
10. `POST /api/contact`, verify it appears in the admin contacts list
11. Apply to an open job, verify it appears in the admin applications list


