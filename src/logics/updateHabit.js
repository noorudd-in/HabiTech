import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { toastSuccess, toastError } from "../components/electrons/Toast";
import { API_URL } from "../constants";

const findAndUpdateHabit = (type) => {
  return state.habits.map((habit) => {
    if (habit.id == id) {
      return { ...habit, status: type, lastUpdated: Date.now() };
    }
    return habit;
  });
};

export const updateHabit = (type, status, name) => {
  const { state, dispatch } = useContext(HabitechContext);
  if (status != 0) {
    toast("You have already updated this habit today!", toastSuccess());
    return;
  }
  if (
    window.confirm(
      `Do you want to update your habit: ${name}? This cannot be undone.`
    )
  ) {
    const updatedHabits = findAndUpdateHabit(type);
    let updatedHealth = state.user.health;
    if (updatedHealth < 100) {
      updatedHealth = updatedHealth + 1;
    }

    axios
      .put(API_URL, {
        ...state,
        user: {
          ...state.user,
          health: updatedHealth,
          exp: state.user.exp + expValue * type,
        },
        habits: updatedHabits,
        lastEdited: new Date(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            user: res?.data?.user,
            habits: res?.data?.habits,
            lastEdited: res?.data?.lastEdited,
          },
        });
        type == 1
          ? toast("Good job keeping up with habit!", toastSuccess())
          : toast("Oh No! You missed it.", toastError());
      });
  }
};
