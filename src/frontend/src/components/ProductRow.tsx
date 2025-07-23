import type { Product } from "../types/ProductType";
import styles from "../style/ProductTable.module.css";

type Props = {
  product: Product;
  quantity: number;
  onChange: (id: string, value: string) => void;
};

function ProductRow({ product, quantity, onChange }: Props) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>
        <input
          className={styles.quantityInput}
          type="number"
          min="0"
          value={quantity} // controlled input
          onChange={(e) => onChange(product._id, e.target.value)}
        />
      </td>
    </tr>
  );
}

export default ProductRow;
