import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/connexion.css";

function Connexion() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: username,
        password,
      });

      // Log the response data immediately after receiving it
      console.log("Response from backend:", res.data);

      const { user_id, role } = res.data; // Make sure user_id is properly extracted

      // Store user ID and role in local storage
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("role", role);

      // Handle redirection based on role
      if (role === "admin") {
        localStorage.setItem("user", JSON.stringify({ id: username, role }));
        history("/admin");
      } else {
        localStorage.setItem("user", JSON.stringify({ id: username, role }));
        history("/test");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="form-container">
        <img
          src="/logoSER.png"
          alt="Logo"
          style={{
            width: "130px",
            height: "130px",
            display: "block",
            margin: "0 auto" /* Center the logo horizontally */,
            marginBottom: "20px",
          }}
        />
        <form>
          <input
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          <button type="submit" onClick={submit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
