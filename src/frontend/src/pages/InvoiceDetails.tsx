import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import style from "../components/Table.module.css";

type InvoiceItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

type Invoice = {
  _id: string;
  items: InvoiceItem[];
  total: number;
  date: string;
  createdAt: string;
};

export default function InvoiceDetails() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await fetch(`/api/invoices/${id}`);
        if (!res.ok) throw new Error("Failed to fetch invoice");
        const data = await res.json();
        setInvoice(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInvoice();
  }, [id]);

  if (loading) return <Layout title="Loading..." button><p>Loading invoice...</p></Layout>;
  if (error) return <Layout title="Error" button><p style={{ color: "red" }}>{error}</p></Layout>;
  if (!invoice) return <Layout title="Invoice Not Found" button><p>No invoice found.</p></Layout>;

  return (
    <Layout title={`Invoice #${invoice._id.slice(-6).toUpperCase()}`} button>
      <div style={{
        borderRadius: "8px",
        maxWidth: "1000px",
      }}>
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}>Invoice Details</h2>
          <p style={{ margin: "0.25rem 0", color: "#555" }}>
            <strong>Date:</strong> {new Date(invoice.date).toLocaleString()}
          </p>
          <p style={{ margin: "0.25rem 0", color: "#555" }}>
            <strong>Total:</strong> ${invoice.total.toFixed(2)}
          </p>
        </section>

        <section>
          <h3 style={{ marginBottom: "1rem" }}>Items</h3>
          <div className={style["table-container"]}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
