import App from "./App";
import { Login } from "./components/Login/Login";
import { NewMessage } from "./components/NewMessage/NewMessage";
import { Signup } from "./components/Signup/Signup";
import { Chatroom } from "./components/Chatroom/Chatroom";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "message",
    element: <NewMessage />,
  },
  {
    path: "room/:roomId",
    element: <Chatroom />,
  },
];

export default routes;
