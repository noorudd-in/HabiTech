import { useState } from "react";
import RenderHabits from "../habit/RenderHabits";
import GoalsHeader from "../goal/GoalsHeader";
import Activity from "./ShowLastActivity";
import AnimatedTabs from "../common/AnimatedTabs";
import RenderGoals from "../goal/RenderGoals";

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState("habits");
  const [showTask, setShowTask] = useState(false);
  const [groupBy, setGroupBy] = useState("timeline");

  return (
    <div className="mb-28">
      <div className="flex justify-center">
        <AnimatedTabs setCurrentTab={setCurrentTab} />
      </div>
      {currentTab == "habits" ? (
        <RenderHabits />
      ) : (
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
      <Activity />
    </div>
  );
};

export default MainContent;
