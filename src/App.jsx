import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AddUser from "./components/adduser";
import Admin from "./components/admin";
import Billing from "./components/billing";
import CriticalStock from "./components/criticalstock";
import Login from "./components/login";
import Stock from "./components/stock";
import Suppliers from "./components/suppliers";
import Purchase from "./components/purchase";
import Billdesk from "./components/billdesk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute role="admin" />} />
        <Route path="/billdesk/*" element={<ProtectedRoute role="billdesk" />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ role }) {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("loggedIn");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!loggedIn || userRole !== role) {
      navigate("/", { replace: true });
    }
  }, [loggedIn, userRole, role, navigate]);

  return (
    <Routes>
      <Route path="stock" element={<Stock />} />
      <Route path="adduser" element={<AddUser />} />
      <Route path="billing" element={<Billing />} />
      <Route path="criticalstock" element={<CriticalStock />} />
      <Route path="purchase" element={<Purchase />} />
      <Route path="suppliers" element={<Suppliers />} />
    </Routes>
  );
}

export default App;
