import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Settings from "../pages/Settings";
import GlobalFooter from "../components/atom/GlobalFooter";

const HABITECH_ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <div>About Us</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setting",
    element: <GlobalFooter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: <GlobalFooter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/calender",
    element: <GlobalFooter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pomodoro",
    element: <GlobalFooter />,
    errorElement: <ErrorPage />,
  },
]);

export default HABITECH_ROUTES;
