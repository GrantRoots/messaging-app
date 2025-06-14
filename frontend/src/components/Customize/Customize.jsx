import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Customize() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("username", e.target.newUsername.value);
        navigate("/");
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <main>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">New Username: </label>
        <input type="text" name="newUsername" placeholder={username} />

        <input type="hidden" name="oldUsername" value={username} />

        <button type="Submit">Update</button>
      </form>
      {error && <div>{error}</div>}
      <Link to={"/"}>Home</Link>
    </main>
  );
}

export { Customize };
