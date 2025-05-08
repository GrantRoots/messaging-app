import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CreateBlog() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleCreateBlog(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://square-lianne-grantroots-428bd7ba.koyeb.app/blogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        setError("Creation failed please try again");
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <>
      <form onSubmit={handleCreateBlog}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" />
        <label htmlFor="text">Text:</label>
        <input type="text" name="text" />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/"}>Home</Link>
    </>
  );
}

export { CreateBlog };
