import { useContext, useState } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "../components/electrons/Toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const CreateHabitPage = () => {
  const [habitName, setHabitName] = useState("");
  const [habitLevel, setHabitLevel] = useState("");
  const { state, dispatch } = useContext(HabitechContext);
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
    };

    axios
      .put(API_URL, {
        ...state,
        habits: [...state.habits, newHabit],
      })
      .then((res) => {
        console.log(res.data.habits);
        dispatch({
          type: "FETCH_DATA",
          payload: {
            habits: res?.data?.habits,
          },
        });
        setHabitName("");
        setHabitLevel("");
        navigate("/?toastType=toastSuccess&toastMessage=New habit created!");
      });
  };
  return (
    <>
      <Toaster />
      <div className="ml-[20%] mt-10">
        <label className="text-2xl block" htmlFor="habit">
          Habit Name
        </label>
        <input
          id="habit"
          type="text"
          value={habitName}
          className="my-1 p-1 bg-gray-50 border w-3/4 border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Read 10 pages daily"
          onChange={(e) => setHabitName(e.target.value)}
          required
        />
        <label className="text-2xl block mt-2" htmlFor="habit-level">
          Habit Level
        </label>
        <select
          id="habit-level"
          className=" my-1 p-1 bg-gray-50 w-3/4 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setHabitLevel(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="easy">Easy</option>
          <option value="decent">Decent</option>
          <option value="hard">Hard</option>
        </select>

        <button
          className="text-center my-3 p-2 bg-amber-500 text-black text-lg rounded-lg items-center"
          onClick={createHabit}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateHabitPage;
