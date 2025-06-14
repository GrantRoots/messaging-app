import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [chatrooms, setChatrooms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const username = localStorage.getItem("username");
  const API_URL = import.meta.env.VITE_API_URL;

  async function findUserChatrooms() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && !loggedIn) setLoggedIn(true);
    try {
      const response = await fetch(`${API_URL}/chatrooms`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) return;
      const data = await response.json();
      setChatrooms(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    findUserChatrooms();
  }, []);

  return (
    <>
      <header className={styles.header}>
        {!loggedIn && (
          <>
            <Link to={"signup"} className={styles.button}>
              Sign Up
            </Link>
            <Link to={"login"} className={styles.button}>
              Log In
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            <div>{username}</div>
            <div>
              <Link to={"message"}>Send A New Message</Link>
              <Link to={"customize"}>Customize Profile</Link>
            </div>
          </>
        )}
      </header>
      <main className={styles.main}>
        {chatrooms.length > 0 &&
          chatrooms.map((room) => {
            return (
              <div key={room.id} className={styles.room}>
                <div>
                  {room.users[0].username === username
                    ? room.users[1].username
                    : room.users[0].username}
                  's Chatroom
                </div>
                <Link to={`room/${room.id}`}>
                  Open{" "}
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/right--v1.png"
                    alt="right--v1"
                  />
                </Link>
              </div>
            );
          })}
        {chatrooms.length < 1 && (
          <div>
            No chatrooms yet Login or click "Send A New Message" to get started!
          </div>
        )}
      </main>
    </>
  );
}

export default App;
