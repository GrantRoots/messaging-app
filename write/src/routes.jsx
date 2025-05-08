import App from "./App";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { CreateBlog } from "./components/CreateBlog";
import { Update } from "./components/Update";

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
    path: "blog",
    element: <CreateBlog />,
  },
  {
    path: "update",
    element: <Update />,
  },
];

export default routes;
