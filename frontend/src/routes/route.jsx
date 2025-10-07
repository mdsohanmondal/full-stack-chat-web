import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ChatUser from "../components/ChatUser";
import Authentication from "../pages/Authentication";
import Logout from "../pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "message/:userId", 
        element: <ChatUser />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "/log-out",
    element: <Logout />,
  },
]);

export default router;
