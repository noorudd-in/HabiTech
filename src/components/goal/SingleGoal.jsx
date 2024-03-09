import { useState } from "react";
import { useLongPress } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import UntickIcon from "../icons/UntickIcon";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import Badge from "../common/Badge";
import AvailableTags from "../common/AvailableTags";
import GoalsSubTask from "./GoalsSubTask";
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const SingleGoal = ({
  showTask,
  id,
  name,
  duedate,
  priority,
  tags,
  description,
  subtasks,
}) => {
  const [toggleGoal, setToggleGoal] = useState(false);
  const getDueDate = () => {
    if (dayjs(new Date(duedate)).isToday()) {
      return "Today";
    }
    if (dayjs(new Date(duedate)).isTomorrow()) {
      return "Tomorrow";
    }
    if (dayjs(new Date(duedate)).isBefore(new Date())) {
      return "Missed";
    }
    const date = dayjs(new Date(duedate)).format("DD MMM YYYY");
    return date;
  };
  const getDate = getDueDate();
  const navigate = useNavigate();

  const attrs = useLongPress(
    () => {
      navigate(`/edit/goal/${id}`);
    },
    { threshold: 500 }
  );

  return (
    <>
      <motion.div {...attrs} className="flex" whileTap={{ scale: 0.98 }}>
        <UntickIcon />
        <div className="ml-3">
          <div className="text-lg" onClick={() => setToggleGoal(!toggleGoal)}>
            {name}
          </div>
          <div className="flex text-sm">
            <Badge deadline={getDate} />
            <h1 className="mx-2">|</h1>
            <Badge priority={priority} />
          </div>

          {(showTask || toggleGoal) && (
            <div id="goals-description" className="mt-2">
              {subtasks.map((task) => {
                return <GoalsSubTask key={task.id} task={task} goalId={id} />;
              })}
            </div>
          )}

          {toggleGoal && (
            <>
              <p className="text-xs italic my-1">{description}</p>
              <AvailableTags tagData={tags} />
              <p className="mt-2 text-xs text-center">
                Created on{" "}
                {dayjs(new Date(id)).format("DD MMM YYYY, hh:mm:ss A")}
              </p>
            </>
          )}
        </div>
      </motion.div>
      <hr className="my-3" />
    </>
  );
};

export default SingleGoal;
