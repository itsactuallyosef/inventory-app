import { useEffect, useState } from "react";
import invoicesAPI, { type Invoice } from "../api/invoicesAPI";
import Layout from "../layouts/Layout";
import InvoicesTable from "../components/InvoicesTable";

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    async function fetchAll() {
      const all: Invoice[] = await invoicesAPI.getInvoices();
      setInvoices(all);
    }

    useEffect(()=>{
        fetchAll();
    }, [])

    return (
        <Layout title="Invoices" button>
            <InvoicesTable invoices={invoices}/>
        </Layout>
    )
}