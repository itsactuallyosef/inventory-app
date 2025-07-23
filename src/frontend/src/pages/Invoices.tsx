import { useEffect, useState } from "react";
import styles from "../style/Invoices.module.css";
import { getInvoices } from "../api/invoicesAPI";
import type { Invoice } from "../types/InvoiceType";
import Item from "../components/InvoiceItem";

function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .catch((err) => {
        setError(err.message || "Failed to fetch invoices");
      });
  }, []);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}

      {invoices.map((invoice) => {
        const isOpen = openIds[invoice._id] || false;

        return (
          <div key={invoice._id} className={styles.invoice}>
            <div
              className={styles.header}
              onClick={() => toggleOpen(invoice._id)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {isOpen ? "▼" : "►"} Date: {new Date(invoice.date).toLocaleString()}
            </div>

            {isOpen && (
              <div className={styles.items}>
                {invoice.items.map((item, idx) => (
                  <Item key={idx} idx={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Invoices;
