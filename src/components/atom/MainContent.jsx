import { useState } from "react";
import Tabs from "../electrons/Tabs";
import HabitIncrease from "./[D]HabitIncrease";
import RenderHabits from "./RenderHabits";
import GoalsHeader from "./GoalsHeader";

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState("habits");

  return (
    <>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab == "habits" ? <RenderHabits /> : <GoalsHeader />}
    </>
  );
};

export default MainContent;
