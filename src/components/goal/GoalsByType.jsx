import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import { motion } from "framer-motion";
import RightIcon from "../icons/RightIcon";
import DownIcon from "../icons/DownIcon";
import SingleGoal from "./SingleGoal";

const GoalsByType = ({ showTask, showActive }) => {
  const { state, appLoading } = useContext(HabitechContext);
  const [goalsData, setGoalsData] = useState(null);
  const [dropdown, setDropdown] = useState("short");
  const [toggleUpdate, setToggleUpdate] = useState(true);
  const index = showActive ? 0 : 1;

  const toggleTap = (type) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    if (dropdown == type) {
      setDropdown(false);
      return;
    }
    setDropdown(type);
  };

  const sortByType = () => {
    const sortedByDueDate = state.goals.toSorted(function compare(a, b) {
      return a.duedate - b.duedate;
    });
    const activeGoals = {};
    const inactiveGoals = {};

    sortedByDueDate.map((goal) => {
      if (goal.status == 0) {
        if (activeGoals[goal.type]) {
          activeGoals[goal.type].push(goal);
        } else {
          activeGoals[goal.type] = [goal];
        }
      }

      if (goal.status == 1) {
        if (inactiveGoals[goal.type]) {
          inactiveGoals[goal.type].push(goal);
        } else {
          inactiveGoals[goal.type] = [goal];
        }
      }
    });

    return [activeGoals, inactiveGoals];
  };

  useEffect(() => {
    if (state.user.name != undefined) {
      const result = sortByType();
      setGoalsData(result);
    }
  }, [toggleUpdate]);

  if (appLoading) return <Shimmer />;
  return (
    <>
      <div>
        <div className="w-4/5 my-5 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg text-red-700 bg-red-500 shadow-lg shadow-red-500/50 justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("short")}
          >
            <h1 className=" text-black mr-5">Short-Term Goals</h1>
            {dropdown == "short" ? (
              <DownIcon className="w-7 h-7 text-gray-800" />
            ) : (
              <RightIcon className="w-7 h-7 text-gray-800" />
            )}
          </motion.div>

          {dropdown == "short" && (
            <div className="mt-5">
              {goalsData?.[index]?.short == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.[index]?.short?.map(
                ({
                  id,
                  name,
                  duedate,
                  priority,
                  tags,
                  description,
                  subtasks,
                  status,
                  type,
                  lastUpdated,
                }) => {
                  return (
                    <SingleGoal
                      key={id}
                      {...{
                        id,
                        name,
                        duedate,
                        priority,
                        tags,
                        description,
                        subtasks,
                        status,
                        type,
                        lastUpdated,
                        showTask,
                        toggleUpdate,
                        setToggleUpdate,
                      }}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>

        <div className="w-4/5 my-5 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg text-yellow-800 bg-yellow-500 shadow-lg shadow-yellow-500/50 justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("mid")}
          >
            <h1 className=" text-black mr-5">Mid-Term Goals</h1>
            {dropdown == "mid" ? (
              <DownIcon className="w-7 h-7 text-gray-800" />
            ) : (
              <RightIcon className="w-7 h-7 text-gray-800" />
            )}
          </motion.div>

          {dropdown == "mid" && (
            <div className="mt-5">
              {goalsData?.[index]?.mid == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.[index]?.mid?.map(
                ({
                  id,
                  name,
                  duedate,
                  priority,
                  tags,
                  description,
                  subtasks,
                  status,
                  type,
                  lastUpdated,
                }) => {
                  return (
                    <SingleGoal
                      key={id}
                      {...{
                        id,
                        name,
                        duedate,
                        priority,
                        tags,
                        description,
                        subtasks,
                        status,
                        type,
                        lastUpdated,
                        showTask,
                        toggleUpdate,
                        setToggleUpdate,
                      }}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>

        <div className="w-4/5 my-5 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg text-green-700 bg-green-500 shadow-lg shadow-green-500/50 justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("long")}
          >
            <h1 className=" text-black mr-5">Long-Term Goals</h1>
            {dropdown == "long" ? (
              <DownIcon className="w-7 h-7 text-gray-800" />
            ) : (
              <RightIcon className="w-7 h-7 text-gray-800" />
            )}
          </motion.div>

          {dropdown == "long" && (
            <div className="mt-5">
              {goalsData?.[index]?.long == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.[index]?.long?.map(
                ({
                  id,
                  name,
                  duedate,
                  priority,
                  tags,
                  description,
                  subtasks,
                  status,
                  type,
                  lastUpdated,
                }) => {
                  return (
                    <SingleGoal
                      key={id}
                      {...{
                        id,
                        name,
                        duedate,
                        priority,
                        tags,
                        description,
                        subtasks,
                        status,
                        type,
                        lastUpdated,
                        showTask,
                        toggleUpdate,
                        setToggleUpdate,
                      }}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GoalsByType;
