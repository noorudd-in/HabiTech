import { lazy, useContext, useState, Suspense } from "react";
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
import Shimmer from "../../pages/Shimmer";
import dayjs from "dayjs";
const HabitModalContent = lazy(() => import("./HabitModalContent"));
const Modal = lazy(() => import("../common/Modal"));

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
  const { bgcolor400, border400, customcolor } = useColorTheme();

  // Perform below action when habit is long pressed
  const attrs = useLongPress(
    () => {
      if (localStorage.getItem("userVibrate") == "true") {
        window.navigator.vibrate([5, 200, 20]);
      }
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
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }

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
      console.log("Clicked");

      const updatedHabits = findAndUpdateHabit(type);

      // Update Health based on action type
      let currentHealth = state.user.health;
      if (currentHealth + type <= 100 && currentHealth + type >= 0) {
        currentHealth = currentHealth + type;
      } else {
        currentHealth = 100;
      }

      // Update coins based on difficulty,
      let newCoins;
      if (difficulty == "easy") {
        newCoins = 0.5;
      } else if (difficulty == "decent") {
        newCoins = 1;
      } else if (difficulty == "hard") {
        newCoins = 1.5;
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
        type: "habit",
        name: name,
        time: Date.now(),
      };

      let updatedAnalytics = { ...state.user.analytics };
      updatedAnalytics.habits[difficulty][1] =
        updatedAnalytics.habits[difficulty][1] + 1;
      updatedAnalytics.habits.total[1] = updatedAnalytics.habits.total[1] + 1;

      // Add record to user analytics;
      let newRecords = { ...state.user.analytics.habits.records };
      let todaysDate = dayjs().format("DD MMM");
      if (newRecords[todaysDate]) {
        newRecords[todaysDate] += 1;
      } else {
        newRecords[todaysDate] = 1;
      }

      // Trigger axios update.
      axios
        .put(API_URL, {
          ...state,
          user: {
            ...state.user,
            health: currentHealth,
            exp: state.user.exp + expValue * type,
            coins: state.user.coins + newCoins,
            analytics: {
              ...state.user.analytics,
              habits: {
                ...state.user.analytics.habits,
                records: newRecords,
              },
              totalMoneyEarned:
                state.user.analytics.totalMoneyEarned + newCoins,
            },
          },
          activity: [...state.activity, newActivity],
          habits: updatedHabits,
          lastEdited: Date.now(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              user: res?.data?.user,
              habits: res?.data?.habits,
              activity: res?.data?.activity,
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
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setToggleModal("");
  };

  return (
    <>
      <Toaster />

      {toggleModal != "hidden" && (
        <Suspense fallback={<Shimmer />}>
          <Modal
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            heading={name}
            footer={"Got it"}
          >
            <HabitModalContent
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
          </Modal>
        </Suspense>
      )}

      <motion.div whileTap={{ scale: 0.97 }}>
        <div
          style={{ userSelect: "none" }}
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
            className={`col-span-10 m-3 ${status != 0 ? "text-black" : ""}`}
          >
            <div className="flex justify-between" onClick={handleClick}>
              <h1 className="text-xl">{name}</h1>
              <Badge difficulty={difficulty} />
            </div>
            <div>
              <div className="w-full h-2 bg-gray-700 mt-3 -mb-3 rounded-t">
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
