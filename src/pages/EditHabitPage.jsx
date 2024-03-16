import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { useColorTheme } from "../hooks/useColorTheme";
import { useNavigate, useParams } from "react-router-dom";
import { toastError } from "../components/common/Toast";
import { API_URL } from "../constants";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EditHabitPage = () => {
  const [habitName, setHabitName] = useState("");
  const [habitLevel, setHabitLevel] = useState("");
  const { state, dispatch } = useContext(HabitechContext);
  const { bgcolor500, lighttext, textcolor500 } = useColorTheme();
  const navigate = useNavigate();
  let { id } = useParams();

  const updateHabit = () => {
    if (habitName == "") {
      toast("Habit name cannot be empty!", toastError());
      return;
    }
    if (habitLevel == "" || habitLevel == "select") {
      toast("Please select the habit level!", toastError());
      return;
    }

    let newHabits = [...state.habits];

    newHabits.map((habit) => {
      if (habit.id == id) {
        habit.name = habitName;
        habit.difficulty = habitLevel;
      }
    });
    axios
      .put(API_URL, {
        ...state,
        habits: newHabits,
        lastEdited: Date.now(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            habits: res?.data?.habits,
            lastEdited: res?.data?.lastEdited,
          },
        });
        navigate("/?toastType=toastInfo&toastMessage=Habit Updated!");
      });
  };

  const deleteHabit = () => {
    if (
      window.confirm(`Are you sure you want to delete the habit: ${habitName}?`)
    ) {
      let newHabits = state.habits.filter((habit) => {
        return habit.id != id;
      });

      axios
        .put(API_URL, {
          ...state,
          habits: newHabits,
          lastEdited: Date.now(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              habits: res?.data?.habits,
              lastEdited: res?.data?.lastEdited,
            },
          });
          navigate("/?toastType=toastError&toastMessage=Habit Deleted!");
        });
    }
  };

  // Find the habit by ID and autofill the details
  useEffect(() => {
    if (state.user.name == undefined) {
      navigate("/");
    } else {
      for (const habit of state.habits) {
        if (habit.id == id) {
          setHabitName(habit.name);
          setHabitLevel(habit.difficulty);
          break;
        }
      }
    }
  }, []);
  return (
    <>
      <Toaster />
      <div
        className={`text-center mt-10 ml-5 text-2xl font-bold ${textcolor500}`}
      >
        <h1>Whoopsie... Let's fix this habit!</h1>
      </div>
      <div className="ml-5 mt-2">
        <label className="text-2xl block" htmlFor="habit">
          What's the habit?
        </label>
        <input
          id="habit"
          type="text"
          value={habitName}
          className="my-1 p-1 border w-3/4 text-black text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Read 10 pages daily"
          onChange={(e) => setHabitName(e.target.value)}
          required
        />
        <label className="text-2xl block mt-2" htmlFor="habit-level">
          How difficult is it?
        </label>
        <select
          id="habit-level"
          value={habitLevel}
          className=" my-1 p-1 w-3/4 border border-gray-300 text-gray-900 text-md rounded-md block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          onChange={(e) => setHabitLevel(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="easy">Easy</option>
          <option value="decent">Decent</option>
          <option value="hard">Hard</option>
        </select>

        <div>
          <button
            className={`text-center my-3 p-2 ${bgcolor500} ${lighttext} text-lg rounded-lg items-center`}
            onClick={updateHabit}
          >
            Update
          </button>

          <span className="mx-5">OR</span>

          <button
            onClick={deleteHabit}
            className="text-center my-3 p-2 text-black bg-red-500 text-lg rounded-lg items-center"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditHabitPage;
