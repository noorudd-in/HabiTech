import { useContext, useEffect } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { useTimeDifference } from "../../hooks/useTimeDifference";
import { API_URL } from "../../constants";
import SingleHabit from "../electrons/SingleHabit";
import axios from "axios";
import Shimmer from "../../pages/Shimmer";
import { motion } from "framer-motion";

const RenderHabits = () => {
  const { state, dispatch, appLoading } = useContext(HabitechContext);
  const lens = state.habits.length;

  // Update the status value of habit once the 12 hours have passed!
  const updateHabitCheck = () => {
    const len = state.habits.length;
    if (len == 0) {
      return null;
    }
    return state.habits.map((habit) => {
      const value = useTimeDifference(habit.lastUpdated);
      if (value == 0) {
        return { ...habit, status: 0 };
      }
      return habit;
    });
  };

  useEffect(() => {
    let updatedHabits = updateHabitCheck();
    if (updatedHabits != null) {
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

  if (appLoading) return <Shimmer />;
  return (
    <div className="mt-5">
      {state.habits.map(
        ({
          id,
          name,
          status,
          difficulty,
          lastUpdated,
          expValue,
          posCount,
          negCount,
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
            />
          );
        }
      )}
    </div>
  );
};

export default RenderHabits;
