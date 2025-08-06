# Inventory App

A simple full‑stack inventory management application with a **Node.js + MongoDB** backend and a minimal **frontend**.
Tracks products and transactions without authentication.

## Features

* **Products**

  * Create, read, update, and delete products
  * Track name, quantity, price, and category
* **Transactions**

  * Record stock in/out and adjust inventory automatically
  * Link transactions to specific products
* **REST API** with JSON responses
* **Frontend UI** for adding/viewing products and transactions

## Tech Stack

* **Backend:** Node.js, Express, MongoDB (Mongoose)
* **Frontend:** React, Vite, CSS Modules
* **Dev tooling:** concurrently (run frontend + backend together)

---

## Installation

```bash
# Clone the repo
git clone https://github.com/your-username/inventory-app.git
cd inventory-app

# Install root (backend) dependencies
npm install

# Install frontend dependencies
cd src/frontend
npm install
cd ../../
```

---

## Environment Variables

1. Copy the template:

   ```bash
   cp .env.example .env
   ```
2. Edit `.env` with your actual settings:

   ```env
   MONGODB_URI=mongodb://localhost:27017/inventory
   PORT=3000
   ```

    **Never commit `.env`** — it should be in `.gitignore`.

---

## Running the App

From the project root:

```bash
npm run dev
```

---

## Endpoints

**Products**

```
GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

**Transactions**

```
GET    /api/transactions
POST   /api/transactions
GET    /api/transactions/:id
```

---

## Development Notes

* No authentication layer (yet)
* Transactions automatically adjust product stock
* Product dropdown in frontend pulls live data from backend
* Designed for local or small-scale use — not production-hardened

## Future Improvements

* Add authentication & roles
* Export reports as CSV/PDF
* Pagination & search
* Unit + integration tests
