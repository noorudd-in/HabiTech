import { useCallback, useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { motion } from "framer-motion";
import { useColorTheme } from "../../hooks/useColorTheme";
import SingleGoal from "./SingleGoal";
import Shimmer from "../../pages/Shimmer";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";
import dayjs from "dayjs";

const GoalsByTimeline = ({ showTask, showActive }) => {
  const [dropdown, setDropdown] = useState("weekly");
  const { state, appLoading } = useContext(HabitechContext);
  const { bgcolor400 } = useColorTheme();
  const [goalsData, setGoalsData] = useState(null);
  const [toggleUpdate, setToggleUpdate] = useState(true);
  const index = showActive ? 0 : 1;

  const toggleTap = (type) => {
    if (state.user.vibrate) {
      window.navigator.vibrate(5);
    }
    if (dropdown == type) {
      setDropdown(false);
      return;
    }
    setDropdown(type);
  };

  const sortByTimeline = useCallback(() => {
    const sortedByDueDate = state.goals.toSorted(function compare(a, b) {
      return a.duedate - b.duedate;
    });

    const endOfWeek = dayjs().add(1, "week");
    const endOfMonth = dayjs().add(1, "month");
    const endOfQuarter = dayjs().add(3, "month");

    const activeGoals = {
      weekly: [],
      monthly: [],
      quarterly: [],
      yearly: [],
    };
    const inactiveGoals = {
      weekly: [],
      monthly: [],
      quarterly: [],
      yearly: [],
    };

    sortedByDueDate.map((goal) => {
      // If goal is active
      if (goal.status == 0) {
        let currentDate = dayjs(new Date(goal.duedate));
        if (currentDate.isBefore(endOfWeek)) {
          activeGoals.weekly.push(goal);
        }
        if (
          currentDate.isAfter(endOfWeek) &&
          currentDate.isBefore(endOfMonth)
        ) {
          activeGoals.monthly.push(goal);
        }
        if (
          currentDate.isAfter(endOfMonth) &&
          currentDate.isBefore(endOfQuarter)
        ) {
          activeGoals.quarterly.push(goal);
        }
        if (currentDate.isAfter(endOfQuarter)) {
          activeGoals.yearly.push(goal);
        }
      }

      // If goal is inactive.
      if (goal.status == 1) {
        let currentDate = dayjs(new Date(goal.duedate));
        if (currentDate.isBefore(endOfWeek)) {
          inactiveGoals.weekly.push(goal);
        }
        if (
          currentDate.isAfter(endOfWeek) &&
          currentDate.isBefore(endOfMonth)
        ) {
          inactiveGoals.monthly.push(goal);
        }
        if (
          currentDate.isAfter(endOfMonth) &&
          currentDate.isBefore(endOfQuarter)
        ) {
          inactiveGoals.quarterly.push(goal);
        }
        if (currentDate.isAfter(endOfQuarter)) {
          inactiveGoals.yearly.push(goal);
        }
      }
    });

    return [activeGoals, inactiveGoals];
  }, []);

  useEffect(() => {
    if (state.user.name != undefined) {
      const result = sortByTimeline();
      setGoalsData(result);
    }
  }, [toggleUpdate]);

  if (appLoading) return <Shimmer />;
  return (
    <>
      <div>
        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("weekly")}
          >
            <h1 className=" text-black mr-5">Less than a week</h1>
            {dropdown == "weekly" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "weekly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic text-gray-300 text-center">
                Goals with a deadline less than a week!
              </p>
              {goalsData?.[index]?.weekly == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.[index]?.weekly?.map(
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
            </>
          )}
        </div>

        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("monthly")}
          >
            <h1 className=" text-black mr-3">Less than a month</h1>
            {dropdown == "monthly" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "monthly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic text-gray-300 text-center">
                Goals with a deadline less than a month!
              </p>
              {goalsData?.[index]?.monthly == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.[index]?.monthly?.map(
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
            </>
          )}
        </div>

        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("quarterly")}
          >
            <h1 className=" text-black mr-3">Less than a quarter</h1>
            {dropdown == "quarterly" ? <DownIcon /> : <UpIcon />}
          </motion.div>
          {dropdown == "quarterly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic text-gray-300 text-center">
                Goals with a deadline less than a qaurter!
              </p>
              {goalsData?.[index]?.quarterly == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.[index]?.quarterly?.map(
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
            </>
          )}
        </div>

        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("yearly")}
          >
            <h1 className=" text-black mr-8">A year or more</h1>
            {dropdown == "yearly" ? <DownIcon /> : <UpIcon />}
          </motion.div>
          {dropdown == "yearly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic text-gray-300 text-center">
                Long-term goals with annual period.
              </p>
              {goalsData?.[index]?.yearly == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.[index]?.yearly?.map(
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GoalsByTimeline;
