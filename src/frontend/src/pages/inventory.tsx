import { useEffect, useState } from "react";
import productsAPI from "../api/productsAPI";
import type { Product } from "../types/Product";
import Layout from "../layouts/Layout";
import TableFilters from "../components/TableFilters";
import ProductsTable from "../components/inventoryTable";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);

    async function fetchAll() {
      const p = await productsAPI.getProducts();
      setProducts(p);
      setFiltered(p); // initially show all
    }

    useEffect(()=>{
        fetchAll();
    }, [])

    function handleFilterChange(filters: Record<string, string>) {
        const category = filters.category || "all";
        const search = filters.search?.toLowerCase() || "";

        const filtered = products.filter((p: Product) => {
            const matchesCategory = category === "all" || p.category?.toLowerCase() === category.toLowerCase();
            const matchesSearch = p.name.toLowerCase().includes(search);
            return matchesCategory && matchesSearch;
        });

        setFiltered(filtered);
    }    
    const navigate = useNavigate();


    return (
        <Layout title="Inventory" button={<Button onClick={() => {
            navigate("/products/new")
        }}>Add product</Button>}>
           <TableFilters
                fields={[
                    {
                    key: "category",
                    label: "Category",
                    type: "select",
                    options: [
                        { value: "all", label: "All Categories" },
                        { value: "electronics", label: "Electronics" },
                        { value: "clothing", label: "Clothing" },
                        { value: "books", label: "Books" },
                        // add more if needed
                    ],
                    },
                    {
                        key: "search",
                        label: "Search by name",
                        type: "text",
                    },
                ]}
                onApply={handleFilterChange}
            />
            <ProductsTable products={filtered}/>
        </Layout>
    )
}