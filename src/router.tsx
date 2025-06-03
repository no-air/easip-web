import { createBrowserRouter } from "react-router";
import MapTest from "./components/Maptest";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import HousePage from "./pages/HousePage";

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
  {
    path: "/post/:postId",
    element: <PostPage />,
  },
  {
    path: "/house/:houseId",
    element: <HousePage />,
  },
]);

export default router;
