import { createBrowserRouter } from "react-router";
import MapTest from "./components/Maptest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/test_map",
    element: <MapTest />,
  },
]);

export default router;
