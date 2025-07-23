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

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");


  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        const defaultQuantities: { [id: string]: number } = {};
        data.forEach((p: Product) => (defaultQuantities[p._id] = 0));
        setQuantities(defaultQuantities);
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
        quantity: typeof quantities[p._id] === "number" ? quantities[p._id] : 0,
      }));

      const result = await addToInvoice(items);

      if (!result.success) {
        setToastMessage(`❌ ${result.error}`);
        return;
      }

      for (const p of products) {
        const remaining = p.quantity - (quantities[p._id] || 0);
        if (remaining <= 3) {
          await createNotification(
            `Low stock: ${p.name} has ${remaining} left.`
          );
          window.dispatchEvent(
            new CustomEvent("notify", {
              detail: `Low stock: ${p.name} has ${remaining} left.`,
            })
          );
        }
      }

      setToastMessage("✅ Invoice submitted!");
  };


  return (
    <div className={styles.container}>
       {/* toast notification */}
      <Notification message={toastMessage} setMessage={setToastMessage} />
        
      {error && <p className={styles.error}>{error}</p>}

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
  );
}

export default Products;
