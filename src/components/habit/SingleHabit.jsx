import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "@uidotdev/usehooks";
import { useTimeDifference } from "../../hooks/useTimeDifference";
import { API_URL } from "../../constants";
import { HabitechContext } from "../../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastSuccess, toastError, toastInfo } from "../common/Toast";
import { motion } from "framer-motion";
import { useColorTheme } from "../../hooks/useColorTheme";
import axios from "axios";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import Badge from "../common/Badge";
import HabitTimeBar from "./HabitTimeBar";
import Modal from "../common/Modal";

const SingleHabit = ({
  id,
  name,
  status,
  difficulty,
  lastUpdated,
  expValue,
  posCount,
  negCount,
  analytics,
}) => {
  const [toggleModal, setToggleModal] = useState("hidden");
  const { state, dispatch } = useContext(HabitechContext);
  const navigate = useNavigate();
  const value = useTimeDifference(lastUpdated);
  const { bgcolor400, lighttext, border400, customcolor } = useColorTheme();

  // Perform below action when habit is long pressed
  const attrs = useLongPress(
    () => {
      navigate(`/edit/habit/${id}`);
    },
    { threshold: 500 }
  );

  // Find the habit with given id and return updated habits array
  const findAndUpdateHabit = (type) => {
    let newposCount;
    let newnegCount;
    return state.habits.map((habit) => {
      if (habit.id == id) {
        if (type == 1) {
          newposCount = habit.posCount + 1;
          newnegCount = habit.negCount;
        } else {
          newposCount = habit.posCount;
          newnegCount = habit.negCount + 1;
        }
        return {
          ...habit,
          status: type,
          lastUpdated: Date.now(),
          posCount: newposCount,
          negCount: newnegCount,
          analytics: [
            ...habit.analytics,
            { date: Date.now(), count: newposCount - newnegCount },
          ],
        };
      }
      return habit;
    });
  };

  // Trigger an update to backend with updated habit array.
  const updateHabit = (type) => {
    if (status != 0) {
      toast(
        "You have already updated this habit today!",
        toastInfo(customcolor)
      );
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
      } else {
        currentHealth = 100;
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
          lastEdited: Date.now(),
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
            ? toast(
                "Good job keeping up with habit!",
                toastSuccess(customcolor)
              )
            : toast("Oh No! You missed it.", toastError());
        });
    }
  };

  const handleClick = () => {
    setToggleModal("");
  };

  return (
    <>
      <Toaster />

      <Modal
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
        data={{
          id: id,
          name: name,
          status: status,
          difficulty: difficulty,
          lastUpdated: lastUpdated,
          expValue: expValue,
          posCount: posCount,
          negCount: negCount,
          analytics: analytics,
        }}
      />

      <motion.div whileTap={{ scale: 0.97 }}>
        <div
          className={`grid grid-cols-12 my-2 border mx-5 rounded-md ${border400} ${
            status != 0 && bgcolor400
          }`}
        >
          <div
            className={`flex flex-row items-center justify-center rounded-l-md ${bgcolor400}`}
            onClick={() => updateHabit(-1)}
          >
            <MinusIcon status={status} className="col-span-1" />
          </div>

          <div
            {...attrs}
            className={`col-span-10 m-3 ${status != 0 ? lighttext : ""}`}
          >
            <div className="flex justify-between" onClick={handleClick}>
              <h1 className="text-xl">{name}</h1>
              <Badge difficulty={difficulty} />
            </div>
            <div>
              <div className="w-full bg-gray-200 h-2 dark:bg-gray-700 mt-3 -mb-3 rounded-t">
                <HabitTimeBar value={parseInt(value)} status={status} />
              </div>
            </div>
          </div>

          <div
            className={`flex flex-row items-center justify-center rounded-r-md ${bgcolor400}`}
            onClick={() => updateHabit(1)}
          >
            <PlusIcon status={status} className="col-span-1" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SingleHabit;
