import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { useTimeDifference } from "../../hooks/useDifference";
import { API_URL } from "../../constants";
import SingleHabit from "./SingleHabit";
import axios from "axios";
import Shimmer from "../../pages/Shimmer";

const RenderHabits = () => {
  const { state, dispatch, appLoading } = useContext(HabitechContext);
  const lens = state.habits.length;
  const [habitData, setHabitData] = useState(state.habits);
  const [performUpdate, setPerformUpdate] = useState(true);
  const resetDuration =
    localStorage.getItem("resetHabit") == null
      ? 720
      : localStorage.getItem("resetHabit");

  // Update the status value of habit once the 12 hours have passed!
  const updateHabitCheck = () => {
    let flag = false;
    const len = state.habits.length;
    if (len == 0) {
      return null;
    }
    let updatedHabits = state.habits.map((habit) => {
      const value = useTimeDifference(habit.lastUpdated, resetDuration);
      if (value == 0 && habit.status != 0) {
        flag = true;
        return { ...habit, status: 0 };
      }
      return habit;
    });
    if (flag) {
      return updatedHabits;
    } else {
      return null;
    }
  };

  useEffect(() => {
    let updatedHabits = updateHabitCheck();

    if (updatedHabits != null && updatedHabits[0] != null) {
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
        });
    }
  }, [lens]);

  useEffect(() => {
    if (localStorage.getItem("moveHabits") == "true") {
      let completedHabits = [];
      let incompleteHabits = [];
      state.habits.map((habit) => {
        if (habit.status == 1) {
          completedHabits.push(habit);
        } else {
          incompleteHabits.push(habit);
        }
      });
      let newHabits = incompleteHabits.concat(completedHabits);
      console.log(newHabits);
      setHabitData(newHabits);
    } else {
      setHabitData(state.habits);
    }
  }, [performUpdate]);

  if (appLoading) return <Shimmer />;
  return (
    <div className="mt-5">
      {state.habits[0] == undefined && (
        <h1 className="m-10 text-center font-bold text-xl">
          No habit found! Click on the plus button to add one!
        </h1>
      )}
      {habitData.map(
        ({
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
          return (
            <SingleHabit
              key={id}
              id={id}
              name={name}
              status={status}
              difficulty={difficulty}
              lastUpdated={lastUpdated}
              expValue={expValue}
              posCount={posCount}
              negCount={negCount}
              analytics={analytics}
              performUpdate={performUpdate}
              setPerformUpdate={setPerformUpdate}
            />
          );
        }
      )}
    </div>
  );
};

export default RenderHabits;
