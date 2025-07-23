import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import Invoices from "./pages/Invoices";
import Notification from "./components/Toast";
import Notifications from "./pages/Notifications";


import { useEffect, useState } from "react";

function App() {
  const [toast, setToast] = useState("");

  useEffect(() => {
    const handleNotify = (e: Event) => {
      const event = e as CustomEvent;
      setToast(event.detail);
    };

    window.addEventListener("notify", handleNotify);
    return () => window.removeEventListener("notify", handleNotify);
  }, []);

  return (
    <BrowserRouter>
      <Notification message={toast} setMessage={setToast} />
      <Routes>
        <Route path="/" element={<Layout title="Products"><Products /></Layout>} />
        <Route path="/invoices" element={<Layout title="Invoices"><Invoices /></Layout>} />
        <Route
          path="/notifications"
          element={<Layout title="Notifications"><Notifications /></Layout>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
