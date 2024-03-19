import { Suspense, lazy, useContext, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
const GoalsByTags = lazy(() => import("./GoalsByTags"));
const GoalsByPriority = lazy(() => import("./GoalsByPriority"));
const GoalsByTimeline = lazy(() => import("./GoalsByTimeline"));
const GoalsByType = lazy(() => import("./GoalsByType"));
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
          <Suspense fallback={<Shimmer />}>
            <GoalsByTimeline {...{ showTask, showActive }} />
          </Suspense>
        )}
        {groupBy == "type" && (
          <Suspense fallback={<Shimmer />}>
            <GoalsByType {...{ showTask, showActive }} />
          </Suspense>
        )}
        {groupBy == "priority" && (
          <Suspense fallback={<Shimmer />}>
            <GoalsByPriority {...{ showTask, showActive }} />
          </Suspense>
        )}
        {groupBy == "tags" && (
          <Suspense fallback={<Shimmer />}>
            <GoalsByTags {...{ showTask, showActive }} />{" "}
          </Suspense>
        )}
      </div>
    </>
  );
};

export default RenderGoals;
