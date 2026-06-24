# Backend + Frontend Product Catalog

This repository contains:

- `backend/`: Express + Prisma API for products
- `frontend/`: Vite + React client
- `prisma/`: database schema and migrations

## Setup

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API

### `GET /products`

Query params:

- `limit` - number of products to return
- `category` - optional category filter
- `cursor` - opaque pagination cursor returned by the previous response

Response fields:

- `count`
- `nextCursor`
- `products`

## Why keyset pagination instead of offset pagination?

This project uses keyset pagination because it is a better fit for a product list that can grow large and change over time.

Offset pagination looks simple, but it has two problems:

- It gets slower as the offset grows, because the database still has to scan past earlier rows.
- It can return skipped or duplicated rows if new products are inserted or deleted between requests.

Keyset pagination avoids both issues by asking for the next page relative to the last item the user already saw. In this app, the cursor is based on `createdAt` and `id`, which gives a stable order and a deterministic tie-breaker.

That means:

- page fetches stay fast even with many rows
- the user sees fewer duplicates or gaps while browsing
- pagination remains consistent while new products are being added

The main tradeoff is that keyset pagination is not designed for jumping directly to page 17 or showing an exact page number. For this catalog, stable scrolling is more important than random page access, so keyset pagination is the right choice.

## Local data loading

The seed script inserts a large sample dataset for development. Run it only when you want to populate the database locally.
