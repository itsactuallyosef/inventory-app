// src/api/invoicesAPI.ts

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

export type NewInvoice = Omit<Invoice, "_id" | "createdAt" | "updatedAt">;

async function getInvoices(): Promise<Invoice[]> {
  const res = await fetch("/api/invoices");
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return await res.json();
}

async function createInvoice(invoice: NewInvoice): Promise<Invoice> {
  const res = await fetch("/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });

  if (!res.ok) throw new Error("Failed to create invoice");
  return await res.json();
}

async function getInvoiceById(id: string): Promise<Invoice> {
  const res = await fetch(`/api/invoices/${id}`);
  if (!res.ok) throw new Error("Failed to fetch invoice");
  return await res.json();
}

async function deleteInvoice(id: string): Promise<void> {
  const res = await fetch(`/api/invoices/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete invoice");
}

export default {
  getInvoices,
  createInvoice,
  getInvoiceById,
  deleteInvoice,
};
