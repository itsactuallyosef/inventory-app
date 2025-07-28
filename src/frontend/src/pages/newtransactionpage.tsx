import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import transactionsAPI from "../api/transactionsAPI";
import productsAPI, { type ProductType } from "../api/productsAPI";
import ModalLayout from "../layouts/modelLayout";
import styles from "../style/NewProductModal.module.css";
import invoicesAPI, { type NewInvoice } from "../api/invoicesAPI";

type NewTransaction = {
  type: "in" | "out";
  name: string;
  productId: string;
  quantity: number;
  date: string;
  reason: string;
};

export default function NewTransactionPage() {
  const [form, setForm] = useState<NewTransaction>({
    type: "in",
    productId: "",
    name: "",
    quantity: 0,
    date: new Date().toISOString().slice(0, 10),
    reason: "",
  });

  const [products, setProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    productsAPI.getProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products."));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(parseInt(value), 0) : value,
    }));
  }

    async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  try {
    const selectedProduct = products.find(p => p._id === form.productId);
    if (!selectedProduct) throw new Error("Invalid product selected");

    // Step 1: create the transaction
    await transactionsAPI.createTransaction({
      ...form,
      name: selectedProduct.name,
    });

    // Step 2: if it's an "out" transaction, also create an invoice
    if (form.type === "out") {
      const invoice: NewInvoice = {
        items: [
          {
            productId: form.productId,
            quantity: form.quantity,
            price: selectedProduct.price ?? 0, // fallback if no price field
            name: selectedProduct.name,
          }
        ],
        total: (selectedProduct.price ?? 0) * form.quantity,
      };

      await invoicesAPI.createInvoice(invoice);
    }

    navigate("/transactions");
  } catch (err) {
    console.error("Transaction creation failed:", err);
    setError("Failed to create transaction.");
  }
}

  return (
    <ModalLayout title="Create New Transaction">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={form.type} onChange={handleChange}>
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="productId">Product</label>
          <select id="productId" name="productId" value={form.productId} onChange={handleChange} required>
            <option value="">Select a product</option>
            {products.map((product: ProductType) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="reason">Note</label>
          <textarea
            id="reason"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={3}
            style={{ resize: "none", height: "30px" }}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button type="submit" className={styles.submit}>Add Transaction</button>
          <button type="button" onClick={() => navigate("/transactions")} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}
