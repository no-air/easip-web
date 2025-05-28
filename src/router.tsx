import { createBrowserRouter } from "react-router";
import MapTest from "./components/Maptest";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/test_map",
    element: <MapTest />,
  },
]);

export default router;
