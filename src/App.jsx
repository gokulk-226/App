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

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
      navigate("/"); // Redirect to login page
    }
  }, [navigate]);

  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} />}>
          <Route index element={<Stock />} />
          <Route path="stock" element={<Stock />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="billing" element={<Billing />} />
          <Route path="criticalstock" element={<CriticalStock />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="suppliers" element={<Suppliers />} />
        </Route>
        <Route path="/billdesk" element={<ProtectedRoute element={<Billdesk />} />}>
          <Route index element={<Billing />} />
          <Route path="stock" element={<Stock />} />
          <Route path="billing" element={<Billing />} />
          <Route path="criticalstock" element={<CriticalStock />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
