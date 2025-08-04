import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import type { NewTransaction } from "../types/Transaction";
import FilterBar from "../components/TableFilters";
import TransactionTable from "../components/transactionTable";
import transactionsAPI from "../api/transactionsAPI";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


export default function Transactions() {
    const [transactions, setTransactions] = useState<NewTransaction[]>([]);
    const [filtered, setFiltered] = useState<NewTransaction[]>([]);

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
        const filtered = transactions.filter((tx: NewTransaction) => {
            const matchesType = type === "all" || tx.type === type;
            const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase());
            return matchesType && matchesSearch;
        });

        setFiltered(filtered);
    }

    const navigate = useNavigate();
    
    
    return (
    <Layout title="Transactions" button={<Button onClick={() => {
        navigate("/transactions/new")
    }}>Create Transaction</Button>}>
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