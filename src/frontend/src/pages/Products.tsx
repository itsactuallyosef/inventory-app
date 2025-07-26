import { useEffect, useState } from "react";
import { getProducts } from "../api/productsAPI";
import { addToInvoice } from "../api/invoicesAPI";
import { createNotification } from "../api/notificationsAPI";
import type { Product } from "../types/ProductType";
import styles from "../style/ProductTable.module.css";
import Notification from "../components/Toast";
import Button from "../components/Button";
import type { Item } from "../types/InvoiceType";
import ProductRow from "../components/ProductRow";
import AddProductModal from "../components/AddProductModal";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        const defaults: { [id: string]: number } = {};
        data.forEach((p: Product) => (defaults[p._id] = 0));
        setQuantities(defaults);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleQuantityChange = (id: string, value: string) => {
    const num = parseInt(value);
    setQuantities((prev) => ({
      ...prev,
      [id]: isNaN(num) || num < 0 ? 0 : num,
    }));
  };

  const handleSubmitInvoice = async () => {
    const items: Item[] = products.map((p) => ({
      _id: p._id,
      quantity: quantities[p._id] || 0,
    }));

    const result = await addToInvoice(items);
    if (!result.success) {
      setToastMessage(`❌ ${result.error}`);
      return;
    }

    for (const p of products) {
      const sold = quantities[p._id] || 0;
      const remaining = p.quantity - sold;
      if (sold > 0 && remaining <= 3) {
        const msg =
          remaining <= 0
            ? `${p.name} is out of stock and was removed.`
            : `Low stock: ${p.name} has ${remaining} left.`;
        await createNotification(msg);
        window.dispatchEvent(new CustomEvent("notify", { detail: msg }));
      }
      if (sold > 0 && remaining <= 0) {
        await fetch(`/api/products/${p._id}`, { method: "DELETE" });
      }
    }

    setToastMessage("✅ Invoice submitted!");
  };

  return (
    <div className={styles.container}>
      <Notification message={toastMessage} setMessage={setToastMessage} />
      {error && <p className={styles.error}>{error}</p>}

      {/* flex: left form always visible, right table */}
      <AddProductModal
        setProducts={setProducts}
        setQuantities={setQuantities}
        setToastMessage={setToastMessage}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <ProductRow
                key={p._id}
                product={p}
                quantity={quantities[p._id] || 0}
                onChange={handleQuantityChange}
              />
            ))}
          </tbody>
        </table>
        <Button onClick={handleSubmitInvoice}>Submit Invoice</Button>
      </div>
    </div>
  );
}
