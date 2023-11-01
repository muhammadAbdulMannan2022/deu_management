import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import AddTodo from "../pages/AddTodo";
import Profile from "../pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/addstore",
        element: <AddTodo />,
      },
      {
        path: "/user/:id",
        element: <Profile />,
      },
    ],
  },
]);
export default router;
