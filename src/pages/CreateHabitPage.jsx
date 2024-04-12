import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../components/common/Toast";
import { useNavigate } from "react-router-dom";
import { API_URL, CLOUD_AUDIO_PATH } from "../constants";
import { useColorTheme } from "../hooks/useColorTheme";
import axios from "axios";

const smartHabits = [
  "Drank 8 galsses of water",
  "Read 20 pages of a book",
  "Did exercise for 30 minutes",
  "Meditated for 10 minutes",
  "Woke up at 6 AM",
  "Ate a healthy breakfast",
  "Avoided sugary snacks and desserts",
  "Gone for a 20-minute walk after dinner",
  "Written gratitude journaling",
  "Limited screen time to 1 hour",
  "Didn't smoked cigarettes",
  "Din't drank alcohol today",
  "Avoid eating fast food",
  "Avoided biting nails",
  "Reduced caffeine intake today",
  "Limited social media usage to 30 minutes",
  "Avoid procrastination?",
  "Slept 7-8 hours",
  "Stoped consuming sugary drinks today",
  "Practiced deep breathing exercises",
];

const CreateHabitPage = () => {
  const [habitName, setHabitName] = useState("");
  const [habitLevel, setHabitLevel] = useState("");
  const [randomIndex, setRandomIndex] = useState(0);
  const { state, dispatch } = useContext(HabitechContext);
  const { bgcolor500, textcolor500 } = useColorTheme();
  const navigate = useNavigate();

  const createHabit = () => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
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

    let newActivity = {
      action: "create",
      type: "habit",
      name: habitName,
      time: Date.now(),
    };

    let updatedAnalytics = { ...state.user.analytics };
    updatedAnalytics.habits[habitLevel][0] =
      updatedAnalytics.habits[habitLevel][0] + 1;
    updatedAnalytics.habits.total[0] = updatedAnalytics.habits.total[0] + 1;

    if (localStorage.getItem("userSound") == "true") {
      const sound = new Audio(
        `${CLOUD_AUDIO_PATH + localStorage.getItem("userCurrentSound")}.mp3`
      );
      sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
      sound.play();
    }

    axios
      .put(API_URL, {
        ...state,
        user: {
          ...state.user,
          analytics: updatedAnalytics,
        },
        habits: [...state.habits, newHabit],
        activity: [...state.activity, newActivity],
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
        setHabitName("");
        setHabitLevel("");
        navigate("/?toastType=toastSuccess&toastMessage=New habit created!");
      });
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
    setRandomIndex(Math.floor(Math.random() * 19));
  }, []);
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
          What's the habit?
        </label>
        <input
          id="habit"
          type="text"
          value={habitName}
          className="my-1 p-1 border w-3/4 text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder={
            localStorage.getItem("smartSuggestions") == "false"
              ? ""
              : smartHabits[randomIndex]
          }
          onChange={(e) => setHabitName(e.target.value)}
          required
        />
        <label className="text-2xl block mt-2" htmlFor="habit-level">
          How difficult is it?
        </label>
        <select
          id="habit-level"
          className=" my-1 p-1 w-3/4 border text-md rounded-md block bg-gray-700 border-gray-600 text-white"
          onChange={(e) => setHabitLevel(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="easy">Easy</option>
          <option value="decent">Decent</option>
          <option value="hard">Hard</option>
        </select>

        <button
          className={`text-center my-3 p-2 ${bgcolor500} text-black text-lg rounded-lg items-center`}
          onClick={createHabit}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateHabitPage;
