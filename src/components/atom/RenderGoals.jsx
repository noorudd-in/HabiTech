import { useState, useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import GoalsByTimeline from "../electrons/GoalsByTimeline";

const RenderGoals = ({ showTask }) => {
  const { state, dispatch, appLoading } = useContext(HabitechContext);

  if (appLoading) return <Shimmer />;

  return (
    <>
      <GoalsByTimeline showTask={showTask} />
    </>
  );
};

export default RenderGoals;
