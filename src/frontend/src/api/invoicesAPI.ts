import type { Item } from "../types/InvoiceType";

export async function addToInvoice(items: Item[]) {
  const res = await fetch("/api/invoices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { success: false, error: err.message || "Failed to create invoice" };
  }

  const data = await res.json();
  return { success: true, data };
}

export async function getInvoices() {
  const res = await fetch("/api/invoices");
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
}
