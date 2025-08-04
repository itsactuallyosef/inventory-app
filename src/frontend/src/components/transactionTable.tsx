import type {NewTransaction} from "../types/Transaction";
import styles from "./Table.module.css";

function TransactionRow({transaction, index}: {transaction: NewTransaction, index: number}) {
    return (
        <tr key={index}>
            <td>{index+1}</td>
            <td>{transaction.name}</td>
            <td>{new Date().toLocaleDateString()}</td>
            <td className={styles[transaction.type]}>{transaction.type}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.reason}</td>
        </tr>
    )
}

export default function TransactionTable({ transactions }: { transactions: NewTransaction[] }) {
  return (
    <div className={styles["table-container"]}>
      <table style={{ width: "100%", borderCollapse: "collapse" }} className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Date</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr key="empty-row">
              <td colSpan={7} className={styles["empty-row"]}>
                No transactions yet.
              </td>
            </tr>
          ) : transactions.map((transaction, i) => (
            <TransactionRow transaction={transaction} index={i}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
