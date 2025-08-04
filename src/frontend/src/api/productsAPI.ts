import type { Product } from "../types/Product";

const BASE_URL = "/api/products";

async function getProducts() {
    const res = await fetch(BASE_URL);
    return await res.json()
}

async function getProductById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return await res.json();
}


async function createProduct(product: Product) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })

  if (!res.ok) throw new Error("Failed to create product")
  return await res.json()
}

async function updateProduct(id: string, update: Partial<Product>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  })

  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
}

export default {updateProduct, createProduct, getProductById, getProducts}

export type ProductNew = Omit<Product, "_id">;
