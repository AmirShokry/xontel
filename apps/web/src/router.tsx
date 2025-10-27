import App from "./App";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chat";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);
