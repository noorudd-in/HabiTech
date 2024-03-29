import { Suspense, lazy, useEffect, useState } from "react";
import RenderPlanner from "../planner/RenderPlanner";
import AnimatedTabs from "../common/AnimatedTabs";
import Shimmer from "../../pages/Shimmer";
const Activity = lazy(() => import("./ShowLastActivity"));
const RenderHabits = lazy(() => import("../habit/RenderHabits"));
const RenderGoals = lazy(() => import("../goal/RenderGoals"));
const GoalsHeader = lazy(() => import("../goal/GoalsHeader"));

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState("planner");
  const [showTask, setShowTask] = useState(false);
  const [groupBy, setGroupBy] = useState("timeline");
  const showLastActivity = localStorage.getItem("showLastActivity");

  useEffect(() => {
    let defaultGoalsGroupBy = localStorage.getItem("defaultGoalsGroupBy");
    let alwaysShowSubtask = localStorage.getItem("alwaysShowSubtask");
    if (defaultGoalsGroupBy != null) setGroupBy(defaultGoalsGroupBy);
    if (alwaysShowSubtask == "true") {
      setShowTask(true);
    }
  }, []);

  return (
    <div className="mb-20">
      <div className="flex justify-center">
        <AnimatedTabs setCurrentTab={setCurrentTab} />
      </div>
      {currentTab == "habit" && (
        <Suspense fallback={<Shimmer />}>
          <RenderHabits />
        </Suspense>
      )}
      {currentTab == "goal" && (
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
      {showLastActivity != "false" && <Activity />}
    </div>
  );
};

export default MainContent;
