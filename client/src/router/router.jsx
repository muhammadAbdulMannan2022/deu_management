import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import AddTodo from "../pages/AddTodo";
import Profile from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import Private from "../Private/Private";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Private>
            <App />
          </Private>
        ),
      },
      {
        path: "/addstore",
        element: (
          <Private>
            <AddTodo />
          </Private>
        ),
      },
      {
        path: "/user/:id",
        element: (
          <Private>
            <Profile />
          </Private>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
export default router;
