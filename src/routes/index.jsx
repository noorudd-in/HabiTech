import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import CreatePage from "../pages/CreatePage";
import Settings from "../pages/Settings";
import GlobalFooter from "../components/atom/GlobalFooter";
import CreateTagPage from "../pages/CreateTagPage";
import CreateHabitPage from "../pages/CreateHabitPage";

const HABITECH_ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setting",
    element: <GlobalFooter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: (
      <>
        <CreatePage />
        <GlobalFooter />
      </>
    ),
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
  {
    path: "/create/tag",
    element: (
      <>
        <CreateTagPage />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create/habit",
    element: (
      <>
        <CreateHabitPage />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default HABITECH_ROUTES;
