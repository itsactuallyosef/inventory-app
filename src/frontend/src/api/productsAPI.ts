
export async function getProducts() {
    const res = await fetch("/api/products");
    return await res.json()
}

export async function getProductById(id: string) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
