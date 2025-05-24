import { createBrowserRouter } from "react-router";
import MapTest from "./components/Maptest";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/home",
    element: <MainPage />,
  },
  {
    path: "/test_map",
    element: <MapTest />,
  },
]);

export default router;
