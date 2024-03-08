import { useContext, useState, useEffect, useCallback } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { motion } from "framer-motion";
import Shimmer from "../../pages/Shimmer";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";
import SingleGoal from "./SingleGoal";

const GoalsByTags = ({ showTask }) => {
  const [dropdown, setDropdown] = useState(null);
  const [goalsData, setGoalsData] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const { state, appLoading } = useContext(HabitechContext);

  const toggleTap = (type) => {
    console.log(goalsData[type]);
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
    const newObj = {};
    sortedByDueDate.map((goal) => {
      goal.tags.map((tag) => {
        if (newObj[tag]) {
          newObj[tag].push(goal);
        } else {
          newObj[tag] = [goal];
        }
      });
    });
    console.log(newObj);
    setAllTags(Object.keys(newObj));
    return newObj;
  }, []);

  useEffect(() => {
    if (state.user.name != undefined) {
      const result = sortByTags();
      setGoalsData(result);
    }
  }, []);

  if (appLoading) return <Shimmer />;
  return (
    <div>
      {allTags?.map((tag) => {
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
                {goalsData?.[tag]?.map(
                  ({
                    id,
                    name,
                    duedate,
                    priority,
                    tags,
                    description,
                    subtasks,
                  }) => {
                    return (
                      <SingleGoal
                        key={id}
                        id={id}
                        name={name}
                        duedate={duedate}
                        priority={priority}
                        tags={tags}
                        description={description}
                        subtasks={subtasks}
                        showTask={showTask}
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
