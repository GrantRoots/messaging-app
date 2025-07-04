import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      });

      if (response.ok) {
        navigate("/");
      } else {
        setError("Sign Up failed please try again");
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" required />

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" required />

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input type="password" name="confirmPassword" required />

        <label htmlFor="firstName">First Name: </label>
        <input type="text" name="firstName" required />

        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name="lastName" required />

        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
      <Link to={"/"}>Home</Link>
    </main>
  );
}

export { Signup };
