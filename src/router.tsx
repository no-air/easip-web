import { createBrowserRouter } from "react-router";
import MapTest from "./components/Maptest";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import HousePage from "./pages/HousePage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundrayLayout from "./pages/ErrorBoundrayLayout";

const router = createBrowserRouter([
  {
    element: <ErrorBoundrayLayout />,
    children: [
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
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
