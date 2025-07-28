import type { Invoice } from "../api/invoicesAPI";
import styles from "./TransactionTable.module.css";

function InvoicesRow({invoice, index}: {invoice: Invoice, index: number}) {
    return (
        <tr key={index}>
            <td>{index+1}</td>
            <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
            <td>{invoice.items[0].name}</td>
            <td>{invoice.items[0].price}</td>
            <td>{invoice.items[0].quantity}</td>
            <td>{invoice.total}</td>
        </tr>
    )
}

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className={styles["table-container"]}>
      <table style={{ width: "100%", borderCollapse: "collapse" }} className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
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
