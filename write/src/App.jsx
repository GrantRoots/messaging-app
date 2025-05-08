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

  async function deleteBlog(blogId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://square-lianne-grantroots-428bd7ba.koyeb.app/blogs/${blogId}`,
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

  async function handlePublish(blogId, published) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://square-lianne-grantroots-428bd7ba.koyeb.app/blogs/${blogId}/publish?published=${published}`,
        {
          method: "PUT",
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
      <Link to={"blog"}>
        <button>Create Blog</button>
      </Link>
      {blogs.length < 1 ? (
        <div>No blogs yet create the first!</div>
      ) : (
        blogs
          .filter((blog) => blog.authorId === userId)
          .map((blog) => (
            <h4 key={blog.id}>
              <div>Title: {blog.title}</div>
              <div>Text: {blog.text}</div>
              <div>Published: {blog.published ? "True" : "False"}</div>
              <Link to={`/update?blogId=${blog.id}`}>
                <button>Update</button>
              </Link>
              <button onClick={() => deleteBlog(blog.id)}>Delete</button>
              <button onClick={() => handlePublish(blog.id, blog.published)}>
                Publish
              </button>
            </h4>
          ))
      )}
    </>
  );
}

export default App;
