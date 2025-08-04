
export type Product = {
  _id: string,
  name: string,
  quantity?: number,
  price: number,
  reorderPoint?: number,
  category?: string,
  supplier?: string,
}
