
export type InvoiceItem = {
  productId: string;
  quantity: number;
  price: number;
  name: string;
};

export type Invoice = {
  _id: string;
  items: InvoiceItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
};