import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import CreatePage from "../pages/CreatePage";
import Settings from "../pages/Settings";
import GlobalFooter from "../components/layout/GlobalFooter";
import CreateTagPage from "../pages/CreateTagPage";
import CreateHabitPage from "../pages/CreateHabitPage";
import CreateGoalPage from "../pages/CreateGoalPage";
import CreatePlanPage from "../pages/CreatePlanPage";
import AnimatePage from "../pages/AnimatePage";
import EditHabitPage from "../pages/EditHabitPage";
import EditGoalPage from "../pages/EditGoalPage";
import EditPlanPage from "../pages/EditPlanPage";
import CommingSoon from "../components/layout/CommingSoon";
import Theme from "../components/setting/Theme";
import Activity from "../components/setting/Activity";

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
    path: "/calender",
    element: (
      <AnimatePage>
        <CommingSoon />
        <GlobalFooter />
      </AnimatePage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/pomodoro",
    element: (
      <AnimatePage>
        <CommingSoon />
        <GlobalFooter />
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
  {
    path: "/create/goal",
    element: (
      <>
        <CreateGoalPage />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create/plan",
    element: (
      <>
        <CreatePlanPage />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/habit/:id",
    element: (
      <>
        <AnimatePage>
          <EditHabitPage />
          <GlobalFooter />
        </AnimatePage>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/goal/:id",
    element: (
      <>
        <AnimatePage>
          <EditGoalPage />
          <GlobalFooter />
        </AnimatePage>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/plan/:id",
    element: (
      <>
        <AnimatePage>
          <EditPlanPage />
          <GlobalFooter />
        </AnimatePage>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/theme",
    element: (
      <>
        <Theme />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/activity",
    element: (
      <>
        <Activity />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/avatar",
    element: (
      <>
        <CommingSoon />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reward",
    element: (
      <>
        <CommingSoon />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sound",
    element: (
      <>
        <CommingSoon />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/lock",
    element: (
      <>
        <CommingSoon />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms",
    element: (
      <>
        <CommingSoon />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy",
    element: (
      <>
        <CommingSoon />
        <GlobalFooter />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default HABITECH_ROUTES;
