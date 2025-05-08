import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));

  async function fetchBlogs() {
    try {
      const response = await fetch(
        "https://square-lianne-grantroots-428bd7ba.koyeb.app/blogs",
        {
          mode: "cors",
        }
      );
      if (!response.ok) return;
      const blogsData = await response.json();
      setBlogs(blogsData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleDelete(commentId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://square-lianne-grantroots-428bd7ba.koyeb.app/blogs/0/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        await fetchBlogs();
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <>
      <Link to={"signup"}>
        <button>Sign Up</button>
      </Link>
      <Link to={"login"}>
        <button>Log In</button>
      </Link>
      {blogs.length < 1 ? (
        <div>No blogs yet create the first!</div>
      ) : (
        blogs
          .filter((blog) => blog.published === true)
          .map((blog) => (
            <h4 key={blog.id}>
              <div>Blog #{blog.id}</div>
              <div>Title: {blog.title}</div>
              <div>Text: {blog.text}</div>
              <div>
                Comments:
                {blog.comments.map((comment) => (
                  <div key={comment.id}>
                    <div>{comment.text}</div>
                    <Link to={`/update?commentid=${comment.id}`}>
                      <button>Update</button>
                    </Link>
                    <button onClick={() => handleDelete(comment.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <Link to={`/create?blogid=${blog.id}`}>
                <button>Add a comment</button>
              </Link>
            </h4>
          ))
      )}
    </>
  );
}

export default App;
