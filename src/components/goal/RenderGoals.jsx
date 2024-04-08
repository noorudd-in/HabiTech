import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import { useDayDifference } from "../../hooks/useDifference";
const GoalsByTags = lazy(() => import("./GoalsByTags"));
const GoalsByPriority = lazy(() => import("./GoalsByPriority"));
const GoalsByTimeline = lazy(() => import("./GoalsByTimeline"));
const GoalsByType = lazy(() => import("./GoalsByType"));
const GoalsByEisenhower = lazy(() => import("./GoalsByEisenhower"));
import TabSwitchForGoals from "../layout/TabSwitchForGoals";
import axios from "axios";
import { API_URL } from "../../constants";

const RenderGoals = ({ showTask, groupBy }) => {
  const { state, appLoading, dispatch } = useContext(HabitechContext);
  const [showActive, setShowActive] = useState(true);
  const deleteGoals =
    localStorage.getItem("deleteGoals") == null
      ? 90
      : parseInt(localStorage.getItem("deleteGoals"));

  // Delete Inactive goals after xxx minutes where is xxx is defined by user!
  const deleteInactiveGoals = () => {
    let flag = false;
    const len = state.goals.length;
    if (len == 0) return null;
    let updatedGoals = state.goals.filter((goal) => {
      if (goal.status == 1) {
        let value = useDayDifference(goal.lastUpdated, deleteGoals);
        if (value) {
          flag = true;
        }
        if (!value) {
          return goal;
        }
      } else {
        return goal;
      }
    });
    if (flag) {
      return updatedGoals;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const updatedGoals = deleteInactiveGoals();
    if (updatedGoals != null && updatedGoals[0] != null) {
      axios
        .put(API_URL, {
          ...state,
          goals: updatedGoals,
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              goals: res?.data?.goals,
            },
          });
        });
    }
  }, [state]);

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
        {groupBy == "eisenhower" && (
          <Suspense fallback={<Shimmer />}>
            <GoalsByEisenhower {...{ showTask, showActive }} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default RenderGoals;
