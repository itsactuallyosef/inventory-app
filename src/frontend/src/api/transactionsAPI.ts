const BASE_URL = "/api/transactions/";

// The full object returned from backend
export type Transaction = {
  _id: string;
  date: string;
  type: "in" | "out";
  productId: string;
  name: string;
  quantity: number;
  reason: string;
};

// The object you send when creating a transaction
export type NewTransaction = Omit<Transaction, "_id">;

async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return await res.json();
}

async function createTransaction(transaction: NewTransaction): Promise<Transaction> {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(transaction)
  })

  if (!res.ok) throw new Error("Failed to create transaction");
  return await res.json();
}

export default { createTransaction, getTransactions };
