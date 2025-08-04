export type Transaction = {
  _id: string;
  date?: string;
  type: "in" | "out";
  productId: string;
  name: string;
  quantity: number;
  reason: string;
};

export type NewTransaction = Omit<Transaction, "_id">;