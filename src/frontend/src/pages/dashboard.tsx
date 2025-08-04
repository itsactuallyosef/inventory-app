import { useEffect, useState } from "react";
import productsAPI, { type Product } from "../api/productsAPI";
import InfoCard from "../components/InfoCard";
import Layout from "../layouts/Layout";
import styles from "../style/dashboard.module.css"
import { FaBox, FaExclamationTriangle, FaReceipt } from "react-icons/fa";
import TransactionTable from "../components/transactionTable";
import transactionsAPI from "../api/transactionsAPI";
import type { Invoice } from "../api/invoicesAPI";
import invoicesAPI from "../api/invoicesAPI";
import type { Transaction } from "../types/Transaction";

export default function Dashboard() {
  const [productsNumber, setProductsNumber] = useState<number | string>(0)
  const [lowStocks, setLowStocks] = useState<number | string>(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])


  async function fetchProducts() {
      try {
        const products = await productsAPI.getProducts() as Array<Product>;
        const invoices = await invoicesAPI.getInvoices() as Array<Invoice>;
        setProductsNumber(products.length);
        setLowStocks(products.filter((product)=> {
          if (!product.quantity || !product.reorderPoint) return
          return product.quantity <= product.reorderPoint
        }).length)
        setInvoices(invoices);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
  }

  async function fetchTransaction() {
    try {
      const transactions = await transactionsAPI.getTransactions() as Array<Transaction>
      setTransactions(transactions.slice(0,5));
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchTransaction();
  }, []);

  return (
    <Layout title="Dashboard" button>
      <h3 className={styles.hsection}>Overview</h3>
       <div style={{ display: "flex", gap: "2rem" }}>
        <InfoCard icon={<FaBox />} title="Total Products" value={productsNumber} />
        <InfoCard icon={<FaExclamationTriangle />} title="Low stocks" value={lowStocks} />
        <InfoCard icon={<FaReceipt />} title="Total Invoices" value={invoices.length} />
      </div>
      
      <h3 className={styles.hsection}>Recent Transactions</h3>
      <TransactionTable transactions={transactions}/>
    </Layout>
  );
}
