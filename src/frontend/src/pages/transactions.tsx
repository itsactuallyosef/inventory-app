import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import type { Transaction } from "../api/transactionsAPI";
import FilterBar from "../components/TableFilters";
import TransactionTable from "../components/transactionTable";
import transactionsAPI from "../api/transactionsAPI";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [filtered, setFiltered] = useState([]);

    async function fetchAll() {
      const tx = await transactionsAPI.getTransactions();
      setTransactions(tx);
      setFiltered(tx); // initially show all
    }

    useEffect(()=>{
        fetchAll();
    }, [])

    function handleFilterChange(filters: Record<string, string>) {
        const { type, search } = filters;
        const filtered = transactions.filter((tx: Transaction) => {
            const matchesType = type === "all" || tx.type === type;
            const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase());
            return matchesType && matchesSearch;
        });

        setFiltered(filtered);
    }
    
    return (
        <Layout title="Transactions">
            <FilterBar
            fields={[
                {
                key: "type",
                label: "Type",
                type: "select",
                options: [
                    { value: "all", label: "All Types" },
                    { value: "in", label: "In" },
                    { value: "out", label: "Out" },
                ],
                },
                { key: "search", label: "Search by name", type: "text" },
            ]}
            onApply={handleFilterChange}
            />

            <TransactionTable transactions={filtered} />
        </Layout>
    )
}