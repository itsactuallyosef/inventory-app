import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Inventory from "./pages/inventory";
import NewProductPage from "./pages/newproductpage";
import NewTransactionPage from "./pages/newtransactionpage";
import Invoices from "./pages/invoices";
import InvoiceDetails from "./pages/InvoiceDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/products/new" element={<NewProductPage />} />
      <Route path="/transactions/new" element={<NewTransactionPage />} />
      <Route path="/invoices/:id" element={<InvoiceDetails />} />

    </Routes>
  );
}

export default App;
