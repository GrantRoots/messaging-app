import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function CreateComment() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogid");

  async function handleCreate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `https://square-lianne-grantroots-428bd7ba.koyeb.app/blogs/${blogId}/comments?userid=${userId}`,
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
      <form onSubmit={handleCreate}>
        <label htmlFor="text">Text:</label>
        <input type="text" name="text" />
        <button type="submit">Submit</button>
      </form>
      {error === null ? "" : <div>{error}</div>}
      <Link to={"/"}>Home</Link>
    </>
  );
}

export { CreateComment };
