import type { NewTransaction, Transaction } from "../types/Transaction"

const BASE_URL = "/api/transactions/";


// The object you send when creating a transaction

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
