import { createBrowserRouter } from "react-router";
import MapTest from "./components/Maptest";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

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
    path: "/posts/:postId",
    element: <PostPage />,
  },
]);

export default router;
