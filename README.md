## Products Filter

Products Filter is a **Next.js** application that displays products and lets users **sort by price** and **filter by color, size, and price range**.  
It uses **Upstash Vector** as the backing store, **React Query** for data fetching and caching, and **Tailwind CSS + shadcn/ui** for a modern UI.

---

### Features

- **Product catalog**: Clean grid of high‑quality cotton products with images, names, sizes, colors, and prices.
- **Sorting controls**: Users can sort items by **price: low → high**, **high → low**, or leave the original ordering.
- **Filter options**: A unified filtering system that allows users to refine the product list through multiple controls, including:
  - multi-select color filters 
  - multi-select size filters 
  - price filtering via quick presets or a custom price range slider with real-time range feedback.
- **Live, debounced updates**: Filters are applied automatically with a short delay so the UI feels instant without spamming the server.
- **Loading states**: While products are loading, the page shows **skeleton cards** instead of blank space.
- **Responsive layout**: Works well on desktop and mobile, with a sidebar for filters on larger screens and a clean layout on smaller ones.

---

### 1. Tech Stack

- **Framework**: Next.js 14 (App Router disabled, using `pages/`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, `tailwindcss-animate`, shadcn/ui primitives
- **Data / Backend**:
  - Upstash Vector (`@upstash/vector`)
  - Custom Next.js API route (`/api/products`)
- **Data Fetching / State**: @tanstack/react-query
- **Validation**: Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React

---

### 2. Getting Started (Local Development)


#### 2.1. Clone the Repository & Install Dependencies

```bash
git clone https://github.com/Mohammedatef1/filter-products.git
cd filter-products
npm install
```

#### 2.2. Install Dependencies

From the project root:

```bash
npm install
```

#### 2.3. Environment Variables

The project uses **Upstash Vector** via `@upstash/vector` and `dotenv`.  
Create a `.env.local` file in the project root, and add:

```bash
# Upstash Vector
UPSTASH_VECTOR_REST_URL=your_upstash_vector_rest_url
UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_rest_token
```

#### 2.4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

### 3. Project Structure

High-level structure:

- `pages/`
  - `_app.tsx` – Global app wrapper, providers, and styles.
  - `_document.tsx` – Custom document for HTML structure/meta.
  - `index.tsx` – Main products listing and filter UI.
  - `api/products/index.ts` – API endpoint handling product filter requests.
- `components/`
  - `products/`
    - `Product.tsx` – Single product display component.
    - `NoProduct.tsx` – Shown when no products match filters.
    - `ProductSkeleton.tsx` – Skeleton loading state.
  - `Providers.tsx` – React Query and UI providers.
  - `ui/` – shadcn/ui-based primitives: `accordion.tsx`, `dropdown-menu.tsx`, `slider.tsx`.
- `db/`
  - `index.ts` – Upstash Vector index configuration and `Product` type.
- `lib/`
  - `validators/ProductValidator.tsx` – Zod schemas for validating product filters.
  - `utils.ts` – Shared utility helpers.
- `styles/globals.css` – Tailwind and global styles.
- `public/` – Static images and assets.

---

### 4. API Overview

#### `POST /api/products`

**Description**:  
Returns a list of products that match the provided filters, retrieved from **Upstash Vector**.

**Request Body**:

```json
{
  "filter": {
    "color": ["white", "blue"],
    "size": ["M"],
    "price": [10, 40],
    "sort": "none | price-asc | price-desc"
  }
}
```

The body is validated using Zod (`ProductFilterValidator`).  
Filters are translated into an Upstash Vector `filter` string and executed with a vector query using `topK`, `vector`, and `includeMetadata`.

**Response**:

- `200 OK`: List of matching products.
- `405 Method Not Allowed`: Any non-`POST` request.
- `500 Internal Server Error`: Unexpected server or validation issues.

---

### 5. Quality & Best Practices

- **TypeScript**: Full type safety for components, API handlers, and database access where possible.
- **Validation**: All filter inputs go through **Zod** (`ProductFilterValidator`) to prevent malformed queries.
- **React Query**: Centralized data fetching, caching, and error states for the products API.
- **UI/UX**:
  - Responsive layout and mobile-friendly design.
  - Skeleton loading states while fetching products.
  - Clear empty-state messaging via `NoProduct` component.
- **Linting**: `npm run lint` enforces a consistent style via `eslint-config-next`.

---

### 6. Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m "Add my feature"`.
4. Run `npm run lint` and `npm run build` to ensure quality.
5. Open a Pull Request with a clear description.

---

### 7. License

This project is licensed under the **MIT License**.

> Licensed under the MIT License – see the `LICENSE` file for details.


