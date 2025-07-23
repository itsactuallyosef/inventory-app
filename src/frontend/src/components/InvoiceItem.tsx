import type { Item } from "../types/InvoiceType"
import styles from "../style/Invoices.module.css"

type Props = {idx: number, item: Item}

const InvoiceItem = ({idx, item}: Props) => {
    return (
        <div key={idx} className={styles.itemRow}>
        <span>ID: {item._id}</span>
        <span>Qty: {item.quantity}</span>
        </div>
    )
}

export default InvoiceItem