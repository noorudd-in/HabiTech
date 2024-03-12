import { useCallback, useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { motion } from "framer-motion";
import { useColorTheme } from "../../hooks/useColorTheme";
import SingleGoal from "./SingleGoal";
import Shimmer from "../../pages/Shimmer";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";

const GoalsByTimeline = ({ showTask, showActive }) => {
  const [dropdown, setDropdown] = useState("weekly");
  const { state, appLoading } = useContext(HabitechContext);
  const { bgcolor400 } = useColorTheme();
  const [goalsData, setGoalsData] = useState(null);
  const [toggleUpdate, setToggleUpdate] = useState(true);
  const index = showActive ? 0 : 1;

  const toggleTap = (type) => {
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
    const activeGoals = {};
    const inactiveGoals = {};
    sortedByDueDate.map((goal) => {
      if (goal.status == 0) {
        if (activeGoals[goal.timeline]) {
          activeGoals[goal.timeline].push(goal);
        } else {
          activeGoals[goal.timeline] = [goal];
        }
      }

      if (goal.status == 1) {
        if (inactiveGoals[goal.timeline]) {
          inactiveGoals[goal.timeline].push(goal);
        } else {
          inactiveGoals[goal.timeline] = [goal];
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
            <h1 className=" text-black mr-5">Weekly Goals</h1>
            {dropdown == "weekly" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "weekly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
                Very short-term goals i.e. Daily or Weekly!
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
                  timeline,
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
                        timeline,
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
            <h1 className=" text-black mr-3">Monthly Goals</h1>
            {dropdown == "monthly" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "monthly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
                Short-term goals with a duration of a month or two!
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
                  timeline,
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
                        timeline,
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
            <h1 className=" text-black mr-3">Quarterly Goals</h1>
            {dropdown == "quarterly" ? <DownIcon /> : <UpIcon />}
          </motion.div>
          {dropdown == "quarterly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
                Mid-term goals with 3 to 6 months of period.
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
                  timeline,
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
                        timeline,
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
            <h1 className=" text-black mr-8">Yearly Goals</h1>
            {dropdown == "yearly" ? <DownIcon /> : <UpIcon />}
          </motion.div>
          {dropdown == "yearly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
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
                  timeline,
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
                        timeline,
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
