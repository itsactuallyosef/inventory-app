import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsAPI from "../api/productsAPI";
import ModalLayout from "../layouts/modelLayout";
import styles from "../style/NewProductModal.module.css"

export default function NewProductPage() {
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    reorderPoint: 10,
    category: "Uncategorized",
    supplier: "Unknown",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" || name === "reorderPoint"
        ? parseFloat(value)
        : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await productsAPI.createProduct(form); // this should expect a NewProduct type
      navigate("/inventory");
    } catch (err) {
      setError("Failed to create product.");
    }
  }

  return (
    <ModalLayout title="Create New Product">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
              <label htmlFor="name">Product Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className={styles.field}>
              <label htmlFor="quantity">Quantity</label>
              <input id="quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
          </div>

          <div className={styles.field}>
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" value={form.price} onChange={handleChange} required />
          </div>

          <div className={styles.field}>
              <label htmlFor="reorderPoint">Reorder Point</label>
              <input id="reorderPoint" name="reorderPoint" type="number" value={form.reorderPoint} onChange={handleChange} />
          </div>

          <div className={styles.field}>
              <label htmlFor="category">Category</label>
              <input id="category" name="category" value={form.category} onChange={handleChange} />
          </div>

          <div className={styles.field}>
              <label htmlFor="supplier">Supplier</label>
              <input id="supplier" name="supplier" value={form.supplier} onChange={handleChange} />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={`${styles.submit} ${styles.full}`}>Add Product</button>
        </form>

    </ModalLayout>
  );
}
