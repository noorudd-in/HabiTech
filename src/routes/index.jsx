import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage";
import Shimmer from "../pages/Shimmer";
const HomePage = lazy(() => import("../pages/HomePage"));
const AnimatePage = lazy(() => import("../pages/AnimatePage"));
const CreatePage = lazy(() => import("../pages/CreatePage"));
const Settings = lazy(() => import("../pages/Settings"));
const GlobalFooter = lazy(() => import("../components/layout/GlobalFooter"));
const CreateTagPage = lazy(() => import("../pages/CreateTagPage"));
const CreateHabitPage = lazy(() => import("../pages/CreateHabitPage"));
const CreateGoalPage = lazy(() => import("../pages/CreateGoalPage"));
const CreatePlanPage = lazy(() => import("../pages/CreatePlanPage"));
const EditHabitPage = lazy(() => import("../pages/EditHabitPage"));
const EditGoalPage = lazy(() => import("../pages/EditGoalPage"));
const EditPlanPage = lazy(() => import("../pages/EditPlanPage"));
const CommingSoon = lazy(() => import("../components/layout/CommingSoon"));
const Theme = lazy(() => import("../components/setting/Theme"));
const Activity = lazy(() => import("../components/setting/Activity"));
const SoundAndVibration = lazy(() =>
  import("../components/setting/SoundAndVibration")
);

const HABITECH_ROUTES = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Shimmer />}>
        <AnimatePage>
          <HomePage />
        </AnimatePage>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/calender",
    element: (
      <Suspense fallback={<Shimmer />}>
        <AnimatePage>
          <CommingSoon />
          <GlobalFooter />
        </AnimatePage>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/pomodoro",
    element: (
      <Suspense fallback={<Shimmer />}>
        <AnimatePage>
          <CommingSoon />
          <GlobalFooter />
        </AnimatePage>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/setting",
    element: (
      <Suspense fallback={<Shimmer />}>
        <AnimatePage>
          <Settings />
          <GlobalFooter />
        </AnimatePage>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: (
      <Suspense fallback={<Shimmer />}>
        <AnimatePage>
          <CreatePage />
          <GlobalFooter />
        </AnimatePage>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create/tag",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CreateTagPage />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create/habit",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CreateHabitPage />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create/goal",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CreateGoalPage />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create/plan",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CreatePlanPage />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/habit/:id",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <AnimatePage>
            <EditHabitPage />
            <GlobalFooter />
          </AnimatePage>
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/goal/:id",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <AnimatePage>
            <EditGoalPage />
            <GlobalFooter />
          </AnimatePage>
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/plan/:id",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <AnimatePage>
            <EditPlanPage />
            <GlobalFooter />
          </AnimatePage>
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/theme",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <Theme />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/activity",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <Activity />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/avatar",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CommingSoon />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reward",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CommingSoon />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sound",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <SoundAndVibration />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/lock",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CommingSoon />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CommingSoon />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CommingSoon />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy",
    element: (
      <>
        <Suspense fallback={<Shimmer />}>
          <CommingSoon />
          <GlobalFooter />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default HABITECH_ROUTES;
