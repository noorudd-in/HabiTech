import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import CreatePage from "../pages/CreatePage";
import Settings from "../pages/Settings";
import GlobalFooter from "../components/atom/GlobalFooter";
import CreateTagPage from "../pages/CreateTagPage";
import CreateHabitPage from "../pages/CreateHabitPage";
import AnimatePage from "../pages/AnimatePage";

const HABITECH_ROUTES = createBrowserRouter([
  {
    path: "/",
    element: (
      <AnimatePage>
        <HomePage />
      </AnimatePage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/setting",
    element: (
      <AnimatePage>
        <Settings />
        <GlobalFooter />
      </AnimatePage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: (
      <AnimatePage>
        <CreatePage />
        <GlobalFooter />
      </AnimatePage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/calender",
    element: (
      <AnimatePage>
        <Settings />
        <GlobalFooter />
      </AnimatePage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/pomodoro",
    element: (
      <AnimatePage>
        <Settings />
        <GlobalFooter />
      </AnimatePage>
    ),
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
