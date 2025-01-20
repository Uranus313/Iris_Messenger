import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "../admin/adminLogin/AdminLogin";
import AdminPanel from "../admin/adminPanel/AdminPanel";
import SuperAdminLogin from "../admin/superAdminLogin/SuperAdminLogin";
import SuperAdminPanel from "../admin/superAdminPanel/SuperAdminPanel";
import AdminHomeLayout from "../layouts/AdminHomeLayout";
import OuterLayout from "../layouts/OuterLayout";
import SuperAdminHomeLayout from "../layouts/SuperAdminHomeLayout";
import UserHomeLayout from "../layouts/UserHomeLayout";
import Login from "../user/login/login";
import MainPage from "../user/mainPage/MainPage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OuterLayout />,
    children: [
      { path: "kir/", element: <App /> },

      {
        path: "user/",
        children: [
          { path: "logIn", element: <Login /> },
          {
            path: "",
            element: <UserHomeLayout />,
            children: [{ path: "", element: <MainPage /> }],
          },
        ],
      },
      {
        path: "admin/",
        children: [
          { path: "logIn", element: <AdminLogin /> },
          {
            path: "",
            element: <AdminHomeLayout />,
            children: [{ path: "", element: <AdminPanel /> }],
          },
        ],
      },
      {
        path: "superAdmin/",
        children: [
          { path: "logIn", element: <SuperAdminLogin /> },
          {
            path: "",
            element: <SuperAdminHomeLayout />,
            children: [{ path: "", element: <SuperAdminPanel /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
