import type { Invoice } from "../types/Invoice";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";

function InvoicesRow({ invoice, index }: { invoice: Invoice; index: number }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/invoices/${invoice._id}`);
  };

  return (
    <tr
      key={index}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <td>{index + 1}</td>
      <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
      <td>{invoice.items.length}</td>
      <td>{invoice.total}</td>
    </tr>
  );
}
export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className={styles["table-container"]}>
      <table style={{ width: "100%", borderCollapse: "collapse" }} className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Products Number</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr key="empty-row">
              <td colSpan={7} className={styles["empty-row"]}>
                No transactions yet.
              </td>
            </tr>
          ) : invoices.map((invoice, i) => (
            <InvoicesRow invoice={invoice} index={i}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
