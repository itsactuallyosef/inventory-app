import styles from "./TransactionTable.module.css";
import type {Product} from "../api/productsAPI"

function ProductRow({product, index}: {product: Product, index: number}) {
    return (
        <tr key={product._id}>
            <td>{index+1}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.supplier}</td>
        </tr>
    )
}

export default function ProductsTable({ products }: { products: Product[] }) {
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
            <ProductRow product={product} index={i}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
