import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname.split("/").pop());
  }, [location]);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("loggedIn");
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
      backgroundColor: "#f4f6f8",
    },
    sidebar: {
      width: "14rem",
      backgroundColor: "#1976d2", // blur blue
      color: "#ffffff",
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      padding: "1.5rem",
      zIndex: 10,
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    header: {
      fontSize: "1.875rem",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "3rem",
      letterSpacing: "0.05em",
      lineHeight: "1.25",
    },
    subheader: {
      fontSize: "1.125rem",
      fontWeight: "300",
    },
    navList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    navItem: {
      marginBottom: "0.75rem",
    },
    link: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.75rem 1.25rem",
      borderRadius: "0.5rem",
      backgroundColor: isActive ? "#ffffff" : "#2196f3",
      color: isActive ? "#1976d2" : "#ffffff",
      textDecoration: "none",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxShadow: isActive ? "0 2px 6px rgba(25, 118, 210, 0.4)" : "none",
      cursor: "pointer",
      userSelect: "none",
    }),
    icon: (isActive) => ({
      fontSize: "1.25rem",
      color: isActive ? "#1976d2" : "#ffffff",
      transition: "color 0.3s ease",
    }),
    logoutBtn: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.75rem 1.25rem",
      marginTop: "2rem",
      width: "100%",
      borderRadius: "0.5rem",
      backgroundColor: "#e53935",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      userSelect: "none",
    },
    main: {
      marginLeft: "16rem",
      width: "100%",
      padding: "2rem",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.header}>
          KPS SILKS<br />
          <span style={styles.subheader}>Admin</span>
        </h2>

        <nav>
          <ul style={styles.navList}>
            {navItems.map(({ label, path, icon }) => {
              const isActive = activeLink === path;
              return (
                <li key={path} style={styles.navItem}>
                  <Link
                    to={path}
                    onClick={() => setActiveLink(path)}
                    style={styles.link(isActive)}
                  >
                    <span className="material-symbols-outlined" style={styles.icon(isActive)}>
                      {icon}
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c62828")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
          type="button"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>
            logout
          </span>
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

export default Admin;
