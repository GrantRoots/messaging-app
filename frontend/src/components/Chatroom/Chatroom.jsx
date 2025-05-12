import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Chatroom() {
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  async function getRoom() {
    try {
      const response = await fetch(
        `http://localhost:3000/chatrooms/${roomId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );
      const responseData = await response.json();

      if (responseData.success) {
        console.log(responseData.room);
        setRoom(responseData.room);
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  useEffect(() => {
    getRoom();
  }, []);

  async function handleSend(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/chatrooms/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
      const responseData = await response.json();

      if (responseData.success) {
        getRoom();
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <>
      {room &&
        room.messages.map((message) => {
          return <div key={message.id}>{message.content}</div>;
        })}
      <form onSubmit={handleSend}>
        <label htmlFor="message">New Message:</label>
        <input type="text" name="message" />
        <input type="hidden" name="roomId" value={roomId} />
        <input type="hidden" name="userId" value={userId} />
        <button type="submit">Send</button>
      </form>
      {error && <div>{error}</div>}
    </>
  );
}

export { Chatroom };
