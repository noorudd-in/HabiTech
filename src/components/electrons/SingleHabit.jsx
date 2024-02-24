import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "@uidotdev/usehooks";
import { useTimeDifference } from "../../hooks/useTimeDifference";
import { API_URL } from "../../constants";
import { HabitechContext } from "../../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastSuccess, toastError, toastInfo } from "./Toast";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import Badge from "./Badge";
import HabitTimeBar from "./HabitTimeBar";
import axios from "axios";

const SingleHabit = ({
  id,
  name,
  status,
  difficulty,
  lastUpdated,
  expValue,
}) => {
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

  // Find the habit with given id and return updated habits array
  const findAndUpdateHabit = (type) => {
    return state.habits.map((habit) => {
      if (habit.id == id) {
        return { ...habit, status: type, lastUpdated: Date.now() };
      }
      return habit;
    });
  };

  // Trigger an update to backend with updated habit array.
  const updateHabit = (type) => {
    if (status != 0) {
      toast("You have already updated this habit today!", toastInfo());
      return;
    }
    if (state.user.health + type < 1 || state.user.health - type < 1) {
      toast(
        "Your health is too low to update this habit!. Please buy health first.",
        toastError()
      );
      return;
    }
    if (
      window.confirm(
        `Do you want to update your habit: ${name}? This cannot be undone.`
      )
    ) {
      const updatedHabits = findAndUpdateHabit(type);

      // Update Health based on action type
      let currentHealth = state.user.health;
      if (currentHealth + type <= 100 && currentHealth + type >= 0) {
        currentHealth = currentHealth + type;
      }

      // Update coins based on difficulty,
      let currentCoins = state.user.coins;
      if (difficulty == "easy") {
        currentCoins = currentCoins + 0.5;
      } else if (difficulty == "decent") {
        currentCoins = currentCoins + 1;
      } else if (difficulty == "hard") {
        currentCoins = currentCoins + 1.5;
      }

      // Trigger axios update.
      axios
        .put(API_URL, {
          ...state,
          user: {
            ...state.user,
            health: currentHealth,
            exp: state.user.exp + expValue * type,
            coins: currentCoins,
          },
          habits: updatedHabits,
          lastEdited: new Date().toLocaleString("en-GB", { hour12: true }),
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
