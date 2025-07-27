
const BASE_URL = "/api/transactions"

export type Transaction = {
    _id: string,
    date: Date,
    type: "in" | "out",
    name: string,
    quantity: number,
    reason: string
}

async function getTransactions() {
    const res = await fetch(BASE_URL);
    return await res.json()
}

async function createTransaction(transaction: Transaction) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(transaction),
    })

    if (!res.ok) throw new Error("Failed to create transaction");
    return await res.json();
}

export default { createTransaction, getTransactions }