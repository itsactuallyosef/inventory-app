import { useEffect, useState } from "react";
import productsAPI, { type Product } from "../api/productsAPI";
import Layout from "../components/Layout";
import TableFilters from "../components/TableFilters";
import ProductsTable from "../components/inventoryTable";

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

    return (
        <Layout title="Inventory">
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