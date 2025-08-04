import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import productsAPI from "../api/productsAPI";
import transactionsAPI from "../api/transactionsAPI";
import type { Product } from "../types/Product";
import Button from "../components/Button"
import styles from "../components/Table.module.css";
import invoicesAPI from "../api/invoicesAPI";


export default function NewTransactionPage() {
  const [products, setProducts] = useState<(Product & {
    type?: "in" | "out" | "-";
    txQuantity?: number;
    reason?: string;
  })[]>([]);

  async function fetchProducts() {
    try {
      const res = await productsAPI.getProducts();
      const productsWithInputs = res.map((p: Product) => ({
        ...p,
        type: "-",
        txQuantity: 0,
        reason: "",
      }));
      setProducts(productsWithInputs);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleChange(id: string, field: "type" | "txQuantity" | "reason", value: string) {
    setProducts(prev =>
      prev.map(p =>
        p._id === id
          ? {
              ...p,
              [field]: field === "txQuantity" ? Number(value) : value,
            }
          : p
      )
    );
  }

  async function handleSubmit() {
  const toSubmit = products.filter(p => p.type !== "-" && p.txQuantity! > 0);

  const txs = toSubmit.map(p => ({
    productId: p._id,
    type: p.type as "in" | "out",
    quantity: p.txQuantity!,
    reason: p.reason!,
    name: p.name,
  }));

  const invoiceItems = toSubmit.map(p => ({
    productId: p._id,
    quantity: p.txQuantity!,
    price: p.price, // assumes `p.price` exists; otherwise fix this
    name: p.name,
  }));

  const total = invoiceItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  try {
    // First: submit all transactions one-by-one
    for (const tx of txs) {
      await transactionsAPI.createTransaction(tx);
    }

    // Then: create invoice
    await invoicesAPI.createInvoice({
      items: invoiceItems,
      total,
    });

    alert("Transactions and invoice submitted.");
  } catch (err) {
    console.error("Submission failed", err);
    alert("Something went wrong.");
  }
}

  return (
    <Layout title="Create New Transaction" button>
      <div className={styles["table-container"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Current Qty</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles["empty-row"]}>
                  No products available.
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category || "-"}</td>
                  <td>{p.quantity ?? 0}</td>
                  <td>
                    <select
                      className={styles[p.type || ""]}
                      value={p.type}
                      onChange={e => handleChange(p._id, "type", e.target.value)}
                    >
                      <option value="-">-</option>
                      <option value="in">In</option>
                      <option value="out">Out</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={p.txQuantity ?? 0}
                      onChange={e => handleChange(p._id, "txQuantity", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Reason"
                      value={p.reason ?? ""}
                      onChange={e => handleChange(p._id, "reason", e.target.value)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
      </div>

      {/* <button className={styles.actionbutton} onClick={handleSubmit}>Submit</button> */}
      <Button onClick={handleSubmit}>Submit</Button>
    </Layout>
  );
}
