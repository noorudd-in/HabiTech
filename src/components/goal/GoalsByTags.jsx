import { useContext, useState, useEffect, useCallback } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { motion } from "framer-motion";
import Shimmer from "../../pages/Shimmer";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";
import SingleGoal from "./SingleGoal";

const GoalsByTags = ({ showTask, showActive }) => {
  const [dropdown, setDropdown] = useState(null);
  const [goalsData, setGoalsData] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const { state, appLoading } = useContext(HabitechContext);
  const [toggleUpdate, setToggleUpdate] = useState(true);
  const index = showActive ? 0 : 1;

  const toggleTap = (type) => {
    if (dropdown == type) {
      setDropdown(false);
      return;
    }
    setDropdown(type);
  };

  const sortByTags = useCallback(() => {
    const sortedByDueDate = state.goals.sort(function compare(a, b) {
      return a.duedate - b.duedate;
    });

    const activeGoals = {};
    const inactiveGoals = {};
    sortedByDueDate.map((goal) => {
      if (goal.tags.length == 0) {
        if (goal.status == 0) {
          if (activeGoals["No Tags"]) {
            activeGoals["No Tags"].push(goal);
          } else {
            activeGoals["No Tags"] = [goal];
          }
        }

        if (goal.status == 1) {
          if (inactiveGoals["No Tags"]) {
            inactiveGoals["No Tags"].push(goal);
          } else {
            inactiveGoals["No Tags"] = [goal];
          }
        }
      }
      goal.tags.map((tag) => {
        if (goal.status == 0) {
          if (activeGoals[tag]) {
            activeGoals[tag].push(goal);
          } else {
            activeGoals[tag] = [goal];
          }
        }

        if (goal.status == 1) {
          if (inactiveGoals[tag]) {
            inactiveGoals[tag].push(goal);
          } else {
            inactiveGoals[tag] = [goal];
          }
        }
      });
    });

    setAllTags([Object.keys(activeGoals), Object.keys(inactiveGoals)]);
    return [activeGoals, inactiveGoals];
  }, []);

  useEffect(() => {
    if (state.user.name != undefined) {
      const result = sortByTags();
      setGoalsData(result);
    }
  }, [toggleUpdate]);

  if (appLoading) return <Shimmer />;
  return (
    <div>
      {allTags?.[index]?.map((tag) => {
        return (
          <div className="w-4/5 my-3 mx-auto" key={tag}>
            <motion.div
              whileTap={{ scale: 0.97 }}
              className={`flex text-lg bg-orange-400 justify-between px-2 rounded-sm mb-2`}
              onClick={() => toggleTap(tag)}
            >
              <h1 className=" text-black mr-5">
                {tag[0].toUpperCase() + tag.slice(1)}
              </h1>
              {dropdown == tag ? <DownIcon /> : <UpIcon />}
            </motion.div>

            {dropdown == tag && (
              <>
                {goalsData?.[index]?.[tag]?.map(
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
        );
      })}
    </div>
  );
};

export default GoalsByTags;
