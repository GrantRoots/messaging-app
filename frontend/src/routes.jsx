import App from "./App";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";

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
];

export default routes;
