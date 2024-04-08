import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { motion } from "framer-motion";
import { useColorTheme } from "../../hooks/useColorTheme";
import Shimmer from "../../pages/Shimmer";
import SingleGoal from "./SingleGoal";
import RightIcon from "../icons/RightIcon";
import DownIcon from "../icons/DownIcon";

const GoalsByEisenhower = ({ showTask, showActive }) => {
  const [dropdown, setDropdown] = useState("urgentImportant");
  const { state, appLoading } = useContext(HabitechContext);
  const { bgcolor400 } = useColorTheme();
  const [goalsData, setGoalsData] = useState(null);
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

  const sortByMatrix = () => {
    const sortedByDueDate = state.goals.toSorted(function compare(a, b) {
      return a.duedate - b.duedate;
    });

    const activeGoals = {
      urgentImportant: [],
      notUrgentImportant: [],
      urgentNotImportant: [],
      notUrgentNotImportant: [],
    };
    const inactiveGoals = {
      urgentImportant: [],
      notUrgentImportant: [],
      urgentNotImportant: [],
      notUrgentNotImportant: [],
    };

    sortedByDueDate.map((goal) => {
      // If goal is active
      if (goal.status == 0) {
        if (goal.type == "short") {
          if (goal.priority == "high") {
            activeGoals.urgentImportant.push(goal);
          } else {
            activeGoals.urgentNotImportant.push(goal);
          }
        } else {
          if (goal.priority == "high") {
            activeGoals.notUrgentImportant.push(goal);
          } else {
            activeGoals.notUrgentNotImportant.push(goal);
          }
        }
      }

      if (goal.status == 1) {
        if (goal.type == "short") {
          if (goal.priority == "high") {
            inactiveGoals.urgentImportant.push(goal);
          } else {
            inactiveGoals.urgentNotImportant.push(goal);
          }
        } else {
          if (goal.priority == "high") {
            inactiveGoals.notUrgentImportant.push(goal);
          } else {
            inactiveGoals.notUrgentNotImportant.push(goal);
          }
        }
      }
    });

    return [activeGoals, inactiveGoals];
  };

  useEffect(() => {
    if (state.user.name != undefined) {
      const result = sortByMatrix();
      setGoalsData(result);
    }
  }, [toggleUpdate, state]);
  if (appLoading) return <Shimmer />;
  return (
    <div>
      <div className="w-4/5 my-3 mx-auto">
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="flex text-lg bg-red-500 justify-between px-2 rounded-sm"
          onClick={() => toggleTap("urgentImportant")}
        >
          <h1 className=" text-black mr-5">Urgent & Important</h1>
          {dropdown == "urgentImportant" ? (
            <DownIcon className="w-7 h-7 text-gray-800" />
          ) : (
            <RightIcon className="w-7 h-7 text-gray-800" />
          )}
        </motion.div>

        {dropdown == "urgentImportant" && (
          <div className="mt-5">
            {goalsData?.[index]?.urgentImportant[0] == undefined && (
              <h1 className="text-center mt-5">No Goals Found</h1>
            )}

            {goalsData?.[index]?.urgentImportant?.map(
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

      <div className="w-4/5 my-3 mx-auto">
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="flex text-lg bg-yellow-500 justify-between px-2 rounded-sm"
          onClick={() => toggleTap("notUrgentImportant")}
        >
          <h1 className=" text-black mr-5">Not Urgent But Important</h1>
          {dropdown == "notUrgentImportant" ? (
            <DownIcon className="w-7 h-7 text-gray-800" />
          ) : (
            <RightIcon className="w-7 h-7 text-gray-800" />
          )}
        </motion.div>

        {dropdown == "notUrgentImportant" && (
          <div className="mt-5">
            {goalsData?.[index]?.notUrgentImportant[0] == undefined && (
              <h1 className="text-center mt-5">No Goals Found</h1>
            )}

            {goalsData?.[index]?.notUrgentImportant?.map(
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

      <div className="w-4/5 my-3 mx-auto">
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="flex text-lg bg-blue-500 justify-between px-2 rounded-sm"
          onClick={() => toggleTap("urgentNotImportant")}
        >
          <h1 className=" text-black mr-5">Urgent & Not Important</h1>
          {dropdown == "urgentNotImportant" ? (
            <DownIcon className="w-7 h-7 text-gray-800" />
          ) : (
            <RightIcon className="w-7 h-7 text-gray-800" />
          )}
        </motion.div>

        {dropdown == "urgentNotImportant" && (
          <div className="mt-5">
            {goalsData?.[index]?.urgentNotImportant[0] == undefined && (
              <h1 className="text-center mt-5">No Goals Found</h1>
            )}

            {goalsData?.[index]?.urgentNotImportant?.map(
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

      <div className="w-4/5 my-3 mx-auto">
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="flex text-lg bg-green-500 justify-between px-2 rounded-sm"
          onClick={() => toggleTap("notUrgentNotImportant")}
        >
          <h1 className=" text-black mr-5">Not Urgent & Not Important</h1>
          {dropdown == "notUrgentNotImportant" ? (
            <DownIcon className="w-7 h-7 text-gray-800" />
          ) : (
            <RightIcon className="w-7 h-7 text-gray-800" />
          )}
        </motion.div>

        {dropdown == "notUrgentNotImportant" && (
          <div className="mt-5">
            {goalsData?.[index]?.notUrgentNotImportant[0] == undefined && (
              <h1 className="text-center">No Goals Found</h1>
            )}

            {goalsData?.[index]?.notUrgentNotImportant?.map(
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
  );
};

export default GoalsByEisenhower;
