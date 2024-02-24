import { useState } from "react";
import Tabs from "../electrons/Tabs";
import RenderHabits from "./RenderHabits";
import GoalsHeader from "./GoalsHeader";
import Activity from "../electrons/ShowLastActivity";

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState("habits");

  return (
    <div className="mb-28">
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab == "habits" ? <RenderHabits /> : <GoalsHeader />}
      <Activity />
    </div>
  );
};

export default MainContent;
