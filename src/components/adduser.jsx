import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/styles.css";

const API_BASE = "https://inventrack-ungc.onrender.com";

function AddUser() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [showScrollHint, setShowScrollHint] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    checkTableScroll();
    window.addEventListener("resize", checkTableScroll);
    return () => window.removeEventListener("resize", checkTableScroll);
  }, [users]);

  const checkTableScroll = () => {
    if (tableRef.current) {
      const { scrollHeight, clientHeight } = tableRef.current;
      setShowScrollHint(scrollHeight > clientHeight);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const usernameRegex = /^[a-zA-Z]+@(admin|billdesk)$/;

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return alert("All fields are required!");
    }

    if (!usernameRegex.test(username)) {
      return alert("Username must be in the format name@admin or name@billdesk.");
    }

    if (users.some((u) => u.username === username)) {
      return alert("Username already exists.");
    }

    try {
      await axios.post(`${API_BASE}/users`, { username, password });
      setUsername("");
      setPassword("");
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.error || "Error adding user.");
    }
  };

  const handleEditClick = (user) => {
    setEditMode(user._id);
    setEditedUsername(user.username);
    setEditedPassword(user.password);
  };

  const handleSaveEdit = async (id) => {
    if (!editedUsername.trim() || !editedPassword.trim()) {
      return alert("Fields cannot be empty.");
    }

    if (!usernameRegex.test(editedUsername)) {
      return alert("Username must be in the format name@admin or name@billdesk.");
    }

    if (users.some((u) => u.username === editedUsername && u._id !== id)) {
      return alert("Username already exists.");
    }

    try {
      await axios.put(`${API_BASE}/users/${id}`, {
        username: editedUsername,
        password: editedPassword,
      });
      setEditMode(null);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.error || "Error updating user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_BASE}/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.error || "Error deleting user.");
    }
  };

  return (
    <div className="container">
      <h2 className="gradient-heading">Add User</h2>

      <form onSubmit={handleAddUser} className="horizontal-form">
        <input
          type="text"
          placeholder="Username (e.g. name@billdesk)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="save-btn">Add User</button>
      </form>

      <h2 className="gradient-heading">User List</h2>

      <div className="table-container relative" ref={tableRef}>
        <table className="table-1">
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-records">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  {editMode === user._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="table-input"
                          value={editedUsername}
                          onChange={(e) => setEditedUsername(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="password"
                          className="table-input"
                          value={editedPassword}
                          onChange={(e) => setEditedPassword(e.target.value)}
                        />
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="save-btn" onClick={() => handleSaveEdit(user._id)}>Save</button>
                          <button className="cancel-btn" onClick={() => setEditMode(null)}>Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.username}</td>
                      <td>{user.password}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {showScrollHint && (
          <span className="material-symbols-outlined scroll-hint-icon">
            arrow_downward_alt
          </span>
        )}
      </div>
    </div>
  );
}

export default AddUser;
