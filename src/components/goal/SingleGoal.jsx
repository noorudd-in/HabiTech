import { Suspense, lazy, useContext, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { useLongPress } from "@uidotdev/usehooks";
import { API_URL } from "../../constants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { toastError, toastSuccess } from "../common/Toast";
import { useColorTheme } from "../../hooks/useColorTheme";
const UntickIcon = lazy(() => import("../icons/UntickIcon"));
const TickIcon = lazy(() => import("../icons/TickIcon"));
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import Badge from "../common/Badge";
const AvailableTags = lazy(() => import("../common/AvailableTags"));
const GoalsSubTask = lazy(() => import("./GoalsSubTask"));
import axios from "axios";
import Shimmer from "../../pages/Shimmer";
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
  type,
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
      if (localStorage.getItem("userVibrate") == "true") {
        window.navigator.vibrate([5, 200, 20]);
      }
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
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    if (status == 1) {
      return;
    }

    let coins = {
      short: { low: 1, medium: 2, high: 3 },
      mid: { low: 15, medium: 25, high: 35 },
      long: { low: 50, medium: 100, high: 150 },
    };

    let exp = {
      short: { low: 2, medium: 4, high: 6 },
      mid: { low: 30, medium: 50, high: 70 },
      long: { low: 100, medium: 200, high: 300 },
    };

    let health = {
      short: 1,
      mid: 15,
      long: 50,
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
          newCoins = coins[type][priority];
          newExp = exp[type][priority];
        }

        // If health surpass 100 after adding new health, set the new health to 100.
        if (state.user.health + health[timeline] <= 100) {
          newHealth = state.user.health + health[timeline];
        } else {
          newHealth = 100;
        }

        if (localStorage.getItem("userSound") == "true") {
          const sound = new Audio(
            `../../../assets/sounds/${localStorage.getItem(
              "userCurrentSound"
            )}.mp3`
          );
          sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
          sound.play();
        }

        let newActivity = {
          action: "complete",
          type: "goal",
          name: name,
          time: Date.now(),
        };

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
            activity: [...state.activity, newActivity],
            lastEdited: Date.now(),
          })
          .then((res) => {
            dispatch({
              type: "FETCH_DATA",
              payload: {
                user: res?.data?.user,
                goals: res?.data?.goals,
                activity: res?.data?.activity,
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
        <Suspense fallback={<Shimmer />}>
          <div onClick={handleUpdate}>
            {status == 0 ? <UntickIcon /> : <TickIcon />}
          </div>
        </Suspense>
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
            <h1 className="mx-2">|</h1>
            <Badge type={type} />
          </div>

          {(showTask || toggleGoal) && (
            <div id="goals-description" className="mt-2">
              {subtasks.map((task) => {
                return (
                  <Suspense fallback={<Shimmer />}>
                    <GoalsSubTask
                      key={task.id}
                      task={task}
                      goalId={id}
                      status={status}
                    />
                  </Suspense>
                );
              })}
            </div>
          )}

          {toggleGoal && (
            <>
              <Suspense fallback={<Shimmer />}>
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
              </Suspense>
            </>
          )}
        </div>
      </motion.div>
      <hr className="my-3" />
    </>
  );
};

export default SingleGoal;
