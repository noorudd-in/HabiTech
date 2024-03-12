import { useState } from "react";
import RenderHabits from "../habit/RenderHabits";
import RenderGoals from "../goal/RenderGoals";
import RenderPlanner from "../planner/RenderPlanner";
import GoalsHeader from "../goal/GoalsHeader";
import Activity from "./ShowLastActivity";
import AnimatedTabs from "../common/AnimatedTabs";

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState("planner");
  const [showTask, setShowTask] = useState(false);
  const [groupBy, setGroupBy] = useState("timeline");

  return (
    <div className="mb-20">
      <div className="flex justify-center">
        <AnimatedTabs setCurrentTab={setCurrentTab} />
      </div>
      {currentTab == "habits" && <RenderHabits />}
      {currentTab == "goals" && (
        <>
          <GoalsHeader
            showTask={showTask}
            setShowTask={setShowTask}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
          />
          <RenderGoals showTask={showTask} groupBy={groupBy} />
        </>
      )}

      {currentTab == "planner" && <RenderPlanner />}
      <Activity />
    </div>
  );
};

export default MainContent;
