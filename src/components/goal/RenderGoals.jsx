import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import GoalsByTimeline from "./GoalsByTimeline";
import GoalsByPriority from "./GoalsByPriority";
import GoalsByTags from "./GoalsByTags";

const RenderGoals = ({ showTask, groupBy }) => {
  const { appLoading } = useContext(HabitechContext);

  if (appLoading) return <Shimmer />;

  return (
    <>
      {groupBy == "timeline" && <GoalsByTimeline showTask={showTask} />}
      {groupBy == "priority" && <GoalsByPriority showTask={showTask} />}
      {groupBy == "tags" && <GoalsByTags showTask={showTask} />}
    </>
  );
};

export default RenderGoals;
