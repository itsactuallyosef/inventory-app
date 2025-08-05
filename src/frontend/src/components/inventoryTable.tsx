import styles from "./Table.module.css";
import type { Product } from "../types/Product"
import { useState } from "react";
import Button from "../components/Button"
import { FaTrash } from "react-icons/fa";

function ProductRow({
  product,
  index,
  onDelete,
}: {
  product: Product;
  index: number;
  onDelete: (id: string) => void;
}) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.supplier}</td>
      <td>
          <Button onClick={() => onDelete(product._id)} variant="danger"><FaTrash/></Button>
      </td>
    </tr>
  );
}

export default function ProductsTable({ products }: { products: Product[] }) {
  const [productList, setProductList] = useState<Product[]>(products);


  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProductList((prev) => prev.filter((p: Product) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className={styles["table-container"]}>
      <table style={{ width: "100%", borderCollapse: "collapse" }} className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr key="empty-row">
              <td colSpan={7} className={styles["empty-row"]}>
                No products yet.
              </td>
            </tr>
          ) : products.map((product, i) => (
            <ProductRow key={product._id} product={product} index={i} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
