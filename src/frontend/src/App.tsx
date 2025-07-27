import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Inventory from "./pages/inventory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/invoices" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
