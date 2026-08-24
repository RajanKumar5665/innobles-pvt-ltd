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

```http
POST /api/admin/auth/register
Content-Type: application/json
x-admin-setup-secret: your-secret

{
  "name": "Admin",
  "email": "admin@innobles.in",
  "password": "a-strong-password"
}
```

A second call to register (or any call without the correct secret) is rejected.

---