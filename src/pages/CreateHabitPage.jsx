import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../components/common/Toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { useColorTheme } from "../hooks/useColorTheme";
import axios from "axios";

const CreateHabitPage = () => {
  const [habitName, setHabitName] = useState("");
  const [habitLevel, setHabitLevel] = useState("");
  const { state, dispatch } = useContext(HabitechContext);
  const { bgcolor500, lighttext, textcolor500 } = useColorTheme();
  const navigate = useNavigate();

  const createHabit = () => {
    // Check if input field is empty
    if (habitName == "") {
      toast("Habit name cannot be empty!", toastError());
      return;
    }
    if (habitLevel == "" || habitLevel == "select") {
      toast("Please select the habit level!", toastError());
      return;
    }
    //Check is state is loaded or not;
    if (state.user.name == undefined) {
      navigate(
        "/?toastType=toastError&toastMessage=Something went wrong. Please try again!"
      );
      return;
    }

    let newHabit = {
      id: Date.now(),
      name: habitName,
      difficulty: habitLevel,
      status: 0,
      lastUpdated: Date.now(),
      expValue: habitLevel == "easy" ? 1 : habitLevel == "decent" ? 2 : 3,
      posCount: 0,
      negCount: 0,
      analytics: [],
    };

    axios
      .put(API_URL, {
        ...state,
        habits: [...state.habits, newHabit],
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
        setHabitName("");
        setHabitLevel("");
        navigate("/?toastType=toastSuccess&toastMessage=New habit created!");
      });
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      navigate("/");
    }
  });
  return (
    <>
      <Toaster />
      <div
        className={`text-center mt-10 ml-5 text-2xl font-bold ${textcolor500}`}
      >
        <h1>Let's create a habit for you!</h1>
      </div>
      <div className="ml-5 mt-2">
        <label className="text-2xl block" htmlFor="habit">
          Habit Name
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
          Habit Level
        </label>
        <select
          id="habit-level"
          className=" my-1 p-1 w-3/4 border border-gray-300 text-gray-900 text-md rounded-md block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          onChange={(e) => setHabitLevel(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="easy">Easy</option>
          <option value="decent">Decent</option>
          <option value="hard">Hard</option>
        </select>

        <button
          className={`text-center my-3 p-2 ${bgcolor500} ${lighttext} text-lg rounded-lg items-center`}
          onClick={createHabit}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateHabitPage;
