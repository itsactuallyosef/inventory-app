import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Dashboard />} />
      <Route path="/transactions" element={<Dashboard />} />
      <Route path="/invoices" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
