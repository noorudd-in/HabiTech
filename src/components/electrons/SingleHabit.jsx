import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "@uidotdev/usehooks";
import { useTimeDifference } from "../../hooks/useTimeDifference";
import { API_URL } from "../../constants";
import { HabitechContext } from "../../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastSuccess, toastError } from "./Toast";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import Badge from "./Badge";
import HabitTimeBar from "./HabitTimeBar";
import axios from "axios";

const SingleHabit = ({ id, name, status, difficulty, lastUpdated }) => {
  const { state, dispatch } = useContext(HabitechContext);
  const navigate = useNavigate();
  const value = useTimeDifference(lastUpdated);

  // Perform below action when habit is long pressed
  const attrs = useLongPress(
    () => {
      navigate(`/edit/habit?id=${id}`);
    },
    { threshold: 500 }
  );

  const findAndUpdateHabit = (type) => {
    return state.habits.map((habit) => {
      if (habit.id == id) {
        return { ...habit, status: type, lastUpdated: Date.now() };
      }
      return habit;
    });
  };

  const updateHabit = (type) => {
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

      axios
        .put(API_URL, {
          ...state,
          habits: updatedHabits,
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              habits: res?.data?.habits,
            },
          });
          type == 1
            ? toast("Good job keeping up with habit!", toastSuccess())
            : toast("Oh No! You missed it.", toastError());
        });
    }
  };

  return (
    <>
      <Toaster />
      <div
        className={`grid grid-cols-12 my-2 border mx-5 rounded-md border-amber-400 ${
          status != 0 && "bg-amber-400"
        }`}
      >
        <div
          className="flex flex-row items-center justify-center rounded-l-md bg-amber-400"
          onClick={() => updateHabit(-1)}
        >
          <MinusIcon status={status} className="col-span-1" />
        </div>

        <div
          {...attrs}
          className={`col-span-10 m-3 ${status != 0 ? "text-black" : ""}`}
        >
          <div className="flex justify-between">
            <h1 className="text-xl">{name}</h1>
            <Badge difficulty={difficulty} />
          </div>
          <div>
            <HabitTimeBar value={parseInt(value)} status={status} />
          </div>
        </div>

        <div
          className="flex flex-row items-center justify-center rounded-r-md bg-amber-400"
          onClick={() => updateHabit(1)}
        >
          <PlusIcon status={status} className="col-span-1" />
        </div>
      </div>
    </>
  );
};

export default SingleHabit;
