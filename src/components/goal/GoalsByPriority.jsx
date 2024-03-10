import { useState, useContext, useCallback, useEffect } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { motion } from "framer-motion";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";
import Shimmer from "../../pages/Shimmer";
import SingleGoal from "./SingleGoal";

const GoalsByPriority = ({ showTask }) => {
  const [goalsData, setGoalsData] = useState(null);
  const [dropdown, setDropdown] = useState("high");
  const { state, appLoading } = useContext(HabitechContext);

  const toggleTap = (type) => {
    if (dropdown == type) {
      setDropdown(false);
      return;
    }
    setDropdown(type);
  };

  const sortByPriority = useCallback(() => {
    const sortedByDueDate = state.goals.sort(function compare(a, b) {
      return a.duedate - b.duedate;
    });
    const newObj = {};

    sortedByDueDate.map((goal) => {
      if (newObj[goal.priority]) {
        newObj[goal.priority].push(goal);
      } else {
        newObj[goal.priority] = [goal];
      }
    });
    return newObj;
  }, []);

  useEffect(() => {
    if (state.user.name != undefined) {
      const result = sortByPriority();
      setGoalsData(result);
    }
  }, []);

  if (appLoading) return <Shimmer />;
  return (
    <>
      <div className="mt-10">
        <div className="w-4/5 my-5 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg text-red-700 bg-red-500 shadow-lg shadow-red-500/50 justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("high")}
          >
            <h1 className=" text-black mr-5">High Priority Goals</h1>
            {dropdown == "high" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "high" && (
            <div className="mt-5">
              {goalsData?.high == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.high?.map(
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
            onClick={() => toggleTap("medium")}
          >
            <h1 className=" text-black mr-5">Medium Priority Goals</h1>
            {dropdown == "medium" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "medium" && (
            <div className="mt-5">
              {goalsData?.medium == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.medium?.map(
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
            onClick={() => toggleTap("low")}
          >
            <h1 className=" text-black mr-5">Low Priority Goals</h1>
            {dropdown == "low" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "low" && (
            <div className="mt-5">
              {goalsData?.low == undefined && (
                <h1 className="text-center">No Goals Found</h1>
              )}

              {goalsData?.low?.map(
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

export default GoalsByPriority;
