import { useState } from "react";
import modalStyles from "../style/AddProductModal.module.css";
import { getProducts } from "../api/productsAPI";
import type { Product } from "../types/ProductType";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setQuantities: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
  setToastMessage: (msg: string) => void;
};

export default function AddProductModal({
  setProducts,
  setQuantities,
  setToastMessage,
}: Props) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      name: newProduct.name,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
    };
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to add product");

      setToastMessage("✅ Product added!");
      setNewProduct({ name: "", quantity: "", price: "" });

      const data = await getProducts();
      setProducts(data);
      const updated: { [id: string]: number } = {};
      data.forEach((p: Product) => (updated[p._id] = 0));
      setQuantities(updated);
    } catch (err: any) {
      setToastMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className={modalStyles.container}>
      <h3>Add Product</h3>
      <form onSubmit={handleAddProduct} className={modalStyles.modal}>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct((p) => ({ ...p, name: e.target.value }))
          }
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct((p) => ({ ...p, quantity: e.target.value }))
          }
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct((p) => ({ ...p, price: e.target.value }))
          }
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
