import { useContext, useState } from "react";
import { useLongPress } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { toastError, toastSuccess } from "../common/Toast";
import { useColorTheme } from "../../hooks/useColorTheme";
import UntickIcon from "../icons/UntickIcon";
import TickIcon from "../icons/TickIcon";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import Badge from "../common/Badge";
import AvailableTags from "../common/AvailableTags";
import GoalsSubTask from "./GoalsSubTask";
import { HabitechContext } from "../../contexts/HabitechContext";
import axios from "axios";
import { API_URL } from "../../constants";
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
  status,
  timeline,
  lastUpdated,
  toggleUpdate,
  setToggleUpdate,
}) => {
  const [toggleGoal, setToggleGoal] = useState(false);
  const { customcolor } = useColorTheme();
  const { state, dispatch } = useContext(HabitechContext);

  const getDueDate = () => {
    if (dayjs(new Date(duedate)).isToday()) {
      return "Today";
    }
    if (dayjs(new Date(duedate)).isTomorrow()) {
      return "Tomorrow";
    }
    if (dayjs(new Date(duedate)).isBefore(new Date(), "day")) {
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

  // Find the goal with given id and return updated goals array
  const findAndUpdateGoal = () => {
    let flag = false;
    let updatedGoals = [...state.goals];
    for (const goal of updatedGoals) {
      // First find the goal with the id.
      if (goal.id == id) {
        // Check if all subtasks are completed for that goal.
        for (const task of goal.subtasks) {
          if (task.status == 0) {
            flag = true;
            break;
          }
        }
        // If flag is true then alert user to complete all subtask or else update the goal.
        if (flag) {
          return flag;
        } else {
          (goal.status = 1), (goal.lastUpdated = Date.now());
          return updatedGoals;
        }
      }
    }
  };
  const handleUpdate = () => {
    if (status == 1) {
      return;
    }

    let coins = {
      weekly: { low: 1, medium: 2, high: 3 },
      monthly: { low: 5, medium: 10, high: 15 },
      quarterly: { low: 15, medium: 25, high: 35 },
      yearly: { low: 50, medium: 100, high: 150 },
    };

    let exp = {
      weekly: { low: 2, medium: 4, high: 6 },
      monthly: { low: 10, medium: 20, high: 30 },
      quarterly: { low: 30, medium: 50, high: 70 },
      yearly: { low: 100, medium: 200, high: 300 },
    };

    let health = {
      weekly: 1,
      monthly: 5,
      quarterly: 15,
      yearly: 50,
    };

    if (
      window.confirm(
        `Do you want to complete the goal: ${name}? This cannot be undone.`
      )
    ) {
      const newGoals = findAndUpdateGoal();
      let newCoins;
      let newExp;
      let newHealth;
      if (newGoals == true) {
        toast("First complete all subtasks!", toastError());
      } else {
        // Perform axios update.

        // If goal's due date is missed, assign 0 coins and 0 exp.
        if (dayjs(new Date(duedate)).isBefore(new Date(), "day")) {
          newCoins = 0;
          newExp = 0;
        } else {
          newCoins = coins[timeline][priority];
          newExp = exp[timeline][priority];
        }

        // If health surpass 100 after adding new health, set the new health to 100.
        if (state.user.health + health[timeline] <= 100) {
          newHealth = state.user.health + health[timeline];
        } else {
          newHealth = 100;
        }

        axios
          .put(API_URL, {
            ...state,
            goals: newGoals,
            user: {
              ...state.user,
              coins: state.user.coins + newCoins,
              exp: state.user.exp + newExp,
              health: newHealth,
            },
            lastEdited: Date.now(),
          })
          .then((res) => {
            dispatch({
              type: "FETCH_DATA",
              payload: {
                user: res?.data?.user,
                goals: res?.data?.goals,
                lastEdited: res?.data?.lastEdited,
              },
            });
            toast("Goal achieved! Congratulations!", toastSuccess(customcolor));
            setToggleUpdate(!toggleUpdate);

            // Notify user after 3 seconds if they completed a missed goal!
            // Notifying user after delay so user can read both notifications.
            if (dayjs(new Date(duedate)).isBefore(new Date(), "day")) {
              setTimeout(
                () =>
                  toast(
                    "No coins and exp added, since you missed the due date of this goal.",
                    toastError()
                  ),
                3000
              );
            }
          });
      }
    }
  };

  return (
    <>
      <motion.div {...attrs} className="flex" whileTap={{ scale: 0.98 }}>
        <div onClick={handleUpdate}>
          {status == 0 ? <UntickIcon /> : <TickIcon />}
        </div>
        <div className="ml-3">
          <div
            className={`text-lg ${status == 1 && "line-through"}`}
            onClick={() => setToggleGoal(!toggleGoal)}
          >
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
              {status != 0 && (
                <p className="text-xs text-center">
                  Completed on{" "}
                  {dayjs(new Date(lastUpdated)).format(
                    "DD MMM YYYY, hh:mm:ss A"
                  )}
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>
      <hr className="my-3" />
    </>
  );
};

export default SingleGoal;
