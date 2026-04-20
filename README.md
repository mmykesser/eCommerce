# eCommerce Platform - Backend API

This is a portfolio project - an eCommerce backend I built to get hands-on experience with Node.js, TypeScript, and MongoDB outside of tutorials. The frontend is in progress, this README is backend only.

**Stack:** Node.js, TypeScript, Express, MongoDB (Mongoose), JWT

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [JWT & User Sessions](#jwt--user-sessions)
- [API Reference](#api-reference)
  - [Auth](#auth-endpoints)
  - [Users](#user-endpoints-admin-only)
  - [Categories](#category-endpoints)
  - [Products](#product-endpoints)
  - [Cart](#cart-endpoints)
  - [Orders](#order-endpoints)
  - [InPost](#inpost-endpoints)
- [Error Handling](#error-handling)

---

## Project Structure

```
ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.ts              # Environment config loader
│   │   ├── controllers/               # Request handlers (HTTP layer)
│   │   │   ├── auth.controller.ts
│   │   │   ├── cart.controller.ts
│   │   │   ├── category.controller.ts
│   │   │   ├── inpost.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── database/
│   │   │   └── db.ts                  # MongoDB connection
│   │   ├── interfaces/
│   │   │   ├── auth/                  # JWT payload types
│   │   │   ├── config/                # Config shape
│   │   │   ├── dto/                   # Request/response data shapes
│   │   │   ├── entities/              # MongoDB document interfaces
│   │   │   ├── express/               # Express Request augmentation
│   │   │   ├── external/              # Third-party API types (InPost)
│   │   │   └── services/              # Service contract interfaces
│   │   ├── middleware/
│   │   │   ├── validation/            # Joi schemas per resource
│   │   │   ├── auth.middleware.ts     # JWT protect + role authorize
│   │   │   └── error.middleware.ts    # Global error handler
│   │   ├── models/                    # Mongoose models
│   │   │   ├── Cart.ts
│   │   │   ├── Category.ts
│   │   │   ├── Order.ts
│   │   │   ├── Product.ts
│   │   │   └── User.ts
│   │   ├── routes/                    # Express routers
│   │   │   ├── auth.routes.ts
│   │   │   ├── cart.routes.ts
│   │   │   ├── category.routes.ts
│   │   │   ├── inpost.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   ├── product.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── services/                  # Business logic layer
│   │   │   ├── auth.service.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── category.service.ts
│   │   │   ├── inpost.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── product.service.ts
│   │   │   └── user.service.ts
│   │   ├── utils/
│   │   │   ├── cookie.utils.ts        # Refresh token cookie helper
│   │   │   ├── errors.utils.ts        # Custom error classes
│   │   │   └── validation.utils.ts    # Joi middleware factory
│   │   └── server.ts                  # App entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/                          # React app (in development)
├── .eslintrc.json
├── .prettierrc
└── .gitignore
```

### Architecture Overview

Layered architecture:

1. Router: Defines routes, applies middleware (auth, validation), 
and wires controllers with their services.
2. Controller: Reads the request (req), calls the appropriate service, and sends the response (res).
3. Service: Handles all business logic, database queries, and throws custom errors.
4. Model: Mongoose / MongoDB schemas.

Controllers don't touch the DB directly. Services don't touch `req`/`res`. Kept this consistent across all resources.

---

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB running locally or a MongoDB Atlas URI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ecommerce.git
cd ecommerce/backend

# Install dependencies
npm install

# Copy the example environment file and fill in your values
cp .env.example .env
```

### Running the server

```bash
# Development mode (with hot reload via nodemon)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run the compiled production build
npm start
```

### Linting & formatting

```bash
npm run lint        # check for ESLint errors
npm run lint:fix    # auto-fix ESLint errors
npm run format      # format all files with Prettier
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/eCommerce

# Auth - use a long random string in production
JWT_SECRET=your_secret_key_here

# InPost API
INPOST_API_TOKEN=your_inpost_token_here
INPOST_POINTS_API_URL=https://sandbox-api-pl-points.easypack24.net

# Frontend origin for CORS
FRONTEND_URL=http://localhost:5173
```

> **Note:** The `MONGODB_URI` above uses a local MongoDB instance with no credentials, so it's safe to have in version control as an example. Never commit a URI that contains a real username and password.

---

## JWT & User Sessions

The API uses two tokens: a short-lived **access token** (15 min) sent in the `Authorization` header, and a long-lived **refresh token** (30 days) stored in an HTTP-only cookie.

The reason for two tokens: if the access token gets stolen somehow, it expires in 15 minutes anyway. The refresh token lives in an HTTP-only cookie which JavaScript can't read at all, so XSS attacks can't grab it. When the access token expires, the frontend calls `POST /api/auth/refresh` - the browser sends the cookie automatically, and the server issues a fresh pair of tokens.

The refresh token is also saved in the database, so it can be invalidated server-side if needed (e.g. on logout, or if something looks suspicious). Logout isn't implemented yet on the frontend, but the backend is ready for it - just clear the cookie and null out the DB field.

> **Heads up for Postman testing:** Postman handles cookies automatically, but you need to make sure the Postman cookie jar is enabled. After login, check the Cookies tab - you should see `refreshToken` there.

---

## API Reference

Base URL: `http://localhost:3000/api`

All successful responses follow this shape:
```
{ "success": true, "data": { ... } }
```

All error responses follow this shape:
```json
{ "success": false, "message": "Description of the error" }
```

---

### Auth Endpoints

#### `POST /api/auth/register`

Register a new user. Returns an access token and sets a refresh token cookie.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "secret123"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "69e5474f6bf46fa28a0dce04",
      "email": "john@gmail.com",
      "name": "John Doe",
      "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### `POST /api/auth/login`

Log in with email and password.

**Request body:**
```json
{
  "email": "john@gmail.com",
  "password": "secret123"
}
```

**Response `200`:** same shape as register.

---

#### `POST /api/auth/refresh`

Get a new access token using the refresh token cookie. No request body needed - the browser sends the cookie automatically.

**Response `200`:** same shape as login.

---

#### `GET /api/auth/profile`

*Requires* `Authorization: Bearer <accessToken>`

Returns the currently authenticated user's profile.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "69e5474f6bf46fa28a0dce04",
      "email": "john@gmail.com",
      "name": "John Doe",
      "role": "user"
    }
  }
}
```

---

### User Endpoints (Admin only)

All `/api/users` routes require:
- `Authorization: Bearer <accessToken>`
- The authenticated user must have `role: "admin"`

---

#### `GET /api/users`

Returns a list of all users. Passwords and refresh tokens are excluded.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "69e5474f6bf46fa28a0dce04",
      "email": "john@gmail.com",
      "name": "John Doe",
      "role": "admin",
      "createdAt": "2026-04-19T21:21:19.512Z",
      "updatedAt": "2026-04-19T21:30:01.655Z"
    }
  ]
}
```

---

#### `GET /api/users/:id`

Returns a single user by ID.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "69e5606f6bf46fa28a0dce8a",
    "email": "john_ON@gmail.com",
    "name": "John On",
    "role": "user",
    "createdAt": "2026-04-19T21:21:19.512Z",
    "updatedAt": "2026-04-19T22:58:52.503Z"
  }
}
```

---

#### `PUT /api/users/:id`

Update a user's name, email, or role. At least one field is required.

**Request body (all fields optional, at least one required):**
```json
{
  "name": "Jane Doe",
  "email": "john@gmail.com",
  "role": "admin"
}
```

**Response `200`:** updated user object.

---

#### `DELETE /api/users/:id`

Delete a user by ID.

**Response `204`:** No Content.

---

### Category Endpoints

#### `GET /api/categories`

Public. Returns all categories, with the `createdBy` field populated with the author's name and email.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Electronics",
      "image": "https://example.com/electronics.jpg",
      "createdBy": { "_id": "...", "name": "Admin", "email": "admin@example.com" }
    }
  ]
}
```

---

#### `POST /api/categories`

*Admin only*

**Request body:**
```json
{
  "name": "Electronics",
  "image": "https://example.com/electronics.jpg"
}
```

**Response `201`:** created category object.

---

#### `PUT /api/categories/:id`

*Admin only*. Update a category's name or image.

**Request body (all fields optional):**
```json
{
  "name": "Consumer Electronics",
  "image": "https://example.com/new-image.jpg"
}
```

**Response `200`:** updated category object.

---

#### `DELETE /api/categories/:id`

*Admin only*

**Response `204`:** No Content.

---

### Product Endpoints

#### `GET /api/products`

Public. Returns all products with the `category` field populated.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "69e555396bf46fa28a0dce3c",
      "title": "iPhone 15 Pro",
      "price": 799.99,
      "description": "Phone from Apple",
      "stock": 42,
      "category": {
        "_id": "69e54e0a6bf46fa28a0dce22",
        "name": "Consumer Electronics",
        "image": "https://example.com/new-image.jpg",
        "createdBy": "69e5474f6bf46fa28a0dce04",
        "createdAt": "2026-04-19T21:50:02.973Z",
        "updatedAt": "2026-04-19T21:50:02.973Z"
      },
      "images": [
        "https://iPhone15_Pro.jpg"
      ],
      "createdAt": "2026-04-19T22:20:41.621Z",
      "updatedAt": "2026-04-19T22:20:41.621Z"
    }
  ]
}
```

---

#### `GET /api/products/:id`

Public. Returns a single product by ID.

**Response `200`:** single product object (same shape as above).

---

#### `POST /api/products`

*Admin only*

**Request body:**
```json
{
  "title": "iPhone 15 Pro",
  "price": 799.99,
  "description": "Phone from Apple",
  "stock": 42,
  "category": "69e54e0a6bf46fa28a0dce22",
  "images": ["https://iPhone15_Pro.jpg"]
}
```

**Response `201`:** created product object.

---

#### `PUT /api/products/:id`

*Admin only.* Update any product fields.

**Request body (all fields optional):**
```json
{
  "price": 555,
  "stock": 38
}
```

**Response `200`:** updated product object.

---

#### `DELETE /api/products/:id`

*Admin only*

**Response `204`:** No Content.

---

### Cart Endpoints

All cart routes require `Authorization: Bearer <accessToken>`. Each user has one cart, created automatically on first access.

---

#### `GET /api/cart`

Returns the current user's cart. Product details are populated.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "69e557a76bf46fa28a0dce45",
    "user": "69e5474f6bf46fa28a0dce04",
    "items": [
      {
        "product": {
          "_id": "69e555396bf46fa28a0dce3c",
          "title": "iPhone 15 Pro",
          "price": 799.99,
          "images": [
            "https://iPhone15_Pro.jpg"
          ]
        },
        "quantity": 2
      }
    ],
    "totalPrice": 1599.98,
    "createdAt": "2026-04-19T22:31:03.422Z",
    "updatedAt": "2026-04-19T22:35:26.032Z"
  }
}
```

---

#### `POST /api/cart`

Add a product to the cart. If the product is already in the cart, the quantity is increased.

**Request body:**
```json
{
  "productId": "69e555396bf46fa28a0dce3c",
  "quantity": 2
}
```

**Response `200`:** updated cart object.

---

#### `PATCH /api/cart/:productId`

Set the exact quantity for a cart item. Send `quantity: 0` to remove the item.

**Request body:**
```json
{
  "quantity": 3
}
```

**Response `200`:** updated cart object.

---

#### `DELETE /api/cart/:productId`

Remove a specific product from the cart.

**Response `200`:** updated cart object.

---

#### `DELETE /api/cart`

Clear all items from the cart.

**Response `204`:** No Content.

---

### Order Endpoints

All order routes require `Authorization: Bearer <accessToken>`.

---

#### `POST /api/orders`

Create an order. Stock is deducted from each product at order time.

**Request body:**
```json
{
  "products": [
    { "product": "69e555396bf46fa28a0dce3c", "quantity": 1 }
  ],
  "shippingDetails": {
    "type": "inpost_paczkomat",
    "address": "CC121"
  }
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "user": "69e5474f6bf46fa28a0dce04",
    "products": [
      {
        "product": "69e555396bf46fa28a0dce3c",
        "quantity": 1
      }
    ],
    "totalPrice": 799.99,
    "shippingDetails": {
      "type": "inpost_paczkomat",
      "address": "CC121"
    },
    "_id": "69e559696bf46fa28a0dce7b",
    "createdAt": "2026-04-19T22:38:33.234Z",
    "updatedAt": "2026-04-19T22:38:33.234Z"
  }
}
```

---

#### `GET /api/orders`

- **Admin:** returns all orders in the system.
- **Regular user:** returns only their own orders.

Orders are sorted by newest first and include user and product details.

**Response `200`:** array of order objects.

---

#### `GET /api/orders/:id`

Get a single order by ID. Regular users can only access their own orders.

**Response `200`:** single order object.

---

#### `DELETE /api/orders/:id`

Delete an order. Stock is restored to each product. Regular users can only delete their own orders.

**Response `204`:** No Content.

---

### InPost Endpoints

Public endpoints for finding InPost parcel lockers (Paczkomaty).

---

#### `GET /api/inpost/points`

Returns a paginated list of parcel lockers.

**Query parameters (all optional):**

| Parameter | Type | Description |
|---|---|---|
| `city` | string | Filter by city name, e.g. `Warszawa` |
| `page` | number | Page number |
| `per_page` | number | Results per page |

> Defaults for `page` and `per_page` are determined by the InPost API itself when the parameters are omitted.

**Example:** `GET /api/inpost/points?city=Warszawa&per_page=2`

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "points": [
      {
        "name": "CC121",
        "status": "Operating",
        "locationDescription": null,
        "city": "Warszawa",
        "street": "Górskiego 4/LU3",
        "buildingNumber": "65L",
        "postCode": "30-390"
      },
      {
        "name": "FRESH801",
        "status": "Operating",
        "locationDescription": "Odbiór w Kasie",
        "city": "Warszawa",
        "street": "Sklep Freshmarket ul.Czerwonych Beretów",
        "buildingNumber": "11c",
        "postCode": "00-910"
      }
    ],
    "totalPages": 19,
    "currentPage": 1
  }
}
```

---

#### `GET /api/inpost/points/:name`

Get details for a specific parcel locker by its machine name (e.g. `CC121`).

**Response `200`:** single point object (same shape as items above).

---

## Known Limitations

Things I know are incomplete or not production-ready:

- **No transactions** - order creation deducts stock in a loop. If it fails halfway, the DB ends up inconsistent. Need to wrap it in a MongoDB transaction.
- **Race conditions in stock** - not sure how to handle this properly yet, need to look into it more.
- **No pagination** - `GET /products` returns everything. Fine for now.
- **No rate limiting** on auth endpoints.
- **Images are just URLs** - no actual file upload handling implemented yet.

---

## Error Handling

The API uses a centralized error handler. All errors return a consistent JSON shape:

```json
{ "success": false, "message": "Invalid email or password" }
```

| HTTP Status | Error Class | When it happens |
|---|---|---|
| `400` | `ValidationError` | Invalid request body (Joi) or invalid MongoDB ID format |
| `401` | `UnauthorizedError` | Missing, expired, or invalid JWT token |
| `403` | `ForbiddenError` | Authenticated but insufficient role (e.g. user trying admin routes) |
| `404` | `NotFoundError` | Resource not found by ID |
| `409` | `ConflictError` | Duplicate entry (e.g. email already registered) or insufficient stock |
| `500` | - | Unexpected server error (logged to console) |
