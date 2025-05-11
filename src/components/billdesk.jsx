import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

function Billdesk() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");
    if (!loggedIn || role !== "billdesk") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setActiveLink(location.pathname.split("/").pop());
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/", { replace: true });
    }
  };

  const navItems = [
    { label: "Billing", path: "billing", icon: "receipt_long" },
    { label: "Stock", path: "stock", icon: "inventory_2" },
    { label: "Critical Stock", path: "criticalstock", icon: "production_quantity_limits" },
  ];

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#f5f7fa",
    },
    sidebar: {
      width: "16rem",
      backgroundColor: "#2e3e99",
      color: "#ffffff",
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      padding: "1.5rem",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      zIndex: 10,
    },
    titleContainer: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: 800,
      letterSpacing: "0.05em",
    },
    navList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    navItem: {
      marginBottom: "1rem",
    },
    link: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.75rem 1.25rem",
      borderRadius: "0.75rem",
      fontSize: "0.875rem",
      fontWeight: 500,
      backgroundColor: "#ffffff",
      color: "#2e3e99",
      textDecoration: "none",
      boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.1)",
      border: `1px solid ${isActive ? "#ffffff" : "#ffffff"}`,
      transition: "all 0.3s ease",
    }),
    icon: {
      fontSize: "1.25rem",
    },
    logoutBtn: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.75rem 1.25rem",
      marginTop: "2.5rem",
      width: "100%",
      borderRadius: "0.75rem",
      background: "linear-gradient(to right, #f44336, #d32f2f)",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: 500,
      transition: "opacity 0.3s ease",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    },
    logoutIcon: {
      fontSize: "1.25rem",
    },
    main: {
      marginLeft: "16rem",
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      padding: "2.5rem",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>Bill Desk</h2>
        </div>

        {/* Navigation */}
        <nav>
          <ul style={styles.navList}>
            {navItems.map(({ label, path, icon }) => {
              const isActive = activeLink === path;
              return (
                <li key={path} style={styles.navItem}>
                  <Link to={path} onClick={() => setActiveLink(path)} style={styles.link(isActive)}>
                    <span className="material-symbols-outlined" style={styles.icon}>{icon}</span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
          onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
        >
          <span className="material-symbols-outlined" style={styles.logoutIcon}>exit_to_app</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Billdesk;
