import { useContext, useState } from "react";
import { useColorTheme } from "../../hooks/useColorTheme";
import { HabitechContext } from "../../contexts/HabitechContext";
import { API_URL, CLOUD_AUDIO_PATH } from "../../constants/index";
import { toast } from "react-hot-toast";
import { toastSuccess } from "../common/Toast";
import axios from "axios";

const GoalsSubTask = ({ task, goalId, status }) => {
  const { state, dispatch } = useContext(HabitechContext);
  const { checkboxcolor, customcolor } = useColorTheme();
  const [checkbox, setCheckbox] = useState(task.status);

  const updateSubtask = () => {
    if (status > 0) {
      return;
    }
    const newGoals = [...state.goals];
    newGoals.forEach((goal) => {
      if (goal.id == goalId) {
        goal.subtasks.forEach((subtask) => {
          if (subtask.id == task.id) {
            subtask.status = subtask.status == 0 ? 1 : 0;
          }
        });
      }
    });

    if (localStorage.getItem("userSound") == "true") {
      const sound = new Audio(
        `${CLOUD_AUDIO_PATH + localStorage.getItem("userCurrentSound")}.mp3`
      );
      sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
      sound.play();
    }
    axios
      .put(API_URL, {
        ...state,
        goals: newGoals,
        lastEdited: Date.now(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            goals: res?.data?.goals,
            lastEdited: res?.data?.lastEdited,
          },
        });
        if (checkbox == 0) {
          toast("Task completed!", toastSuccess(customcolor));
          setCheckbox(1);
        } else {
          setCheckbox(0);
        }
      });
  };
  return (
    <>
      <div className="flex text-sm">
        <input
          type="checkbox"
          id={task.id}
          className={`${checkboxcolor} bg-gray-100 border-gray-300 rounded mx-2`}
          onChange={updateSubtask}
          checked={checkbox == 1 ? "checked" : ""}
        ></input>
        <label
          htmlFor={task.id}
          className={`${checkbox == 1 && "line-through"}`}
        >
          {task.name}
        </label>
      </div>
    </>
  );
};

export default GoalsSubTask;
