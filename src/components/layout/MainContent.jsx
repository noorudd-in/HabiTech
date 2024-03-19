import { Suspense, lazy, useState } from "react";
import RenderPlanner from "../planner/RenderPlanner";
import Activity from "./ShowLastActivity";
import AnimatedTabs from "../common/AnimatedTabs";
import Shimmer from "../../pages/Shimmer";
const RenderHabits = lazy(() => import("../habit/RenderHabits"));
const RenderGoals = lazy(() => import("../goal/RenderGoals"));
const GoalsHeader = lazy(() => import("../goal/GoalsHeader"));

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState("planner");
  const [showTask, setShowTask] = useState(false);
  const [groupBy, setGroupBy] = useState("timeline");

  return (
    <div className="mb-20">
      <div className="flex justify-center">
        <AnimatedTabs setCurrentTab={setCurrentTab} />
      </div>
      {currentTab == "habits" && (
        <Suspense fallback={<Shimmer />}>
          <RenderHabits />
        </Suspense>
      )}
      {currentTab == "goals" && (
        <>
          <Suspense fallback={<Shimmer />}>
            <GoalsHeader
              showTask={showTask}
              setShowTask={setShowTask}
              groupBy={groupBy}
              setGroupBy={setGroupBy}
            />
            <RenderGoals showTask={showTask} groupBy={groupBy} />
          </Suspense>
        </>
      )}

      {currentTab == "planner" && <RenderPlanner />}
      <Activity />
    </div>
  );
};

export default MainContent;
