import { useContext, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import GoalsByTimeline from "./GoalsByTimeline";
import GoalsByPriority from "./GoalsByPriority";
import GoalsByTags from "./GoalsByTags";
import TabSwitchForGoals from "../layout/TabSwitchForGoals";

const RenderGoals = ({ showTask, groupBy }) => {
  const { appLoading } = useContext(HabitechContext);
  const [showActive, setShowActive] = useState(true);

  if (appLoading) return <Shimmer />;

  return (
    <>
      <div className="mt-5">
        <div className="text-right mr-10 mb-3">
          <TabSwitchForGoals {...{ showActive, setShowActive }} />
        </div>
        {groupBy == "timeline" && (
          <GoalsByTimeline {...{ showTask, showActive }} />
        )}
        {groupBy == "priority" && (
          <GoalsByPriority {...{ showTask, showActive }} />
        )}
        {groupBy == "tags" && <GoalsByTags {...{ showTask, showActive }} />}
      </div>
    </>
  );
};

export default RenderGoals;
