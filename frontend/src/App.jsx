import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [chatrooms, setChatrooms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  async function findUserChatrooms() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) setLoggedIn(true);
    try {
      const response = await fetch("http://localhost:300/chatrooms", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          body: JSON.stringify(userId),
        },
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
            <Link to={"signup"}>
              <button className={styles.button}>Sign Up</button>
            </Link>
            <Link to={"login"}>
              <button className={styles.button}>Log In</button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            <div>"Username" Is Logged In</div>
            <button className={styles.button}>Send A New Message</button>
            <button className={styles.button}>Customize Profile</button>
          </>
        )}
      </header>
      <main className={styles.main}>
        {chatrooms.length > 0 && <div>{chatrooms.map()}</div>}
        {chatrooms.length < 1 && (
          <div>No chatrooms yet click "Send A New Message" to get started!</div>
        )}
      </main>
    </>
  );
}

export default App;

//shows all their chatrooms on the main page

//They will have to search a username to send them a message
//then it opens a chatroom with them

//make sure chat rooms only have 2 people allowed in them?

//customize profile part - change username, add photo?
