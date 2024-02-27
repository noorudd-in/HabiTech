import { useState } from "react";
import RenderHabits from "./RenderHabits";
import GoalsHeader from "./GoalsHeader";
import Activity from "../electrons/ShowLastActivity";
import AnimatedTabs from "../electrons/AnimatedTabs";
import RenderGoals from "./RenderGoals";

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState("habits");

  return (
    <div className="mb-28">
      <AnimatedTabs setCurrentTab={setCurrentTab} />
      {currentTab == "habits" ? <RenderHabits /> : <RenderGoals />}
      <Activity />
    </div>
  );
};

export default MainContent;
