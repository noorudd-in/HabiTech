import { useEffect, useState } from "react";
import ToggleButton from "../common/ToggleButton";
import { useColorTheme } from "../../hooks/useColorTheme";
import DragAndSort from "./advanced/DragAndSort";
import Modal from "../common/Modal";
import { Toaster, toast } from "react-hot-toast";
import { toastError } from "../common/Toast";
import axios from "axios";
import { API_URL, INITIAL_DATA } from "../../constants";
const AdvancedSetting = () => {
  const [showDueDate, setDueDate] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [showType, setShowType] = useState(true);
  const [deleteGoals, setDeleteGoals] = useState(90);
  const [showSubtask, setShowSubtask] = useState(false);
  const [groupby, setGroupby] = useState("timeline");
  const [showDifficulty, setShowDifficulty] = useState(true);
  const [moveHabits, setMoveHabits] = useState(false);
  const [showDuration, setShowDuration] = useState(true);
  const [resetHabit, setResetHabit] = useState(720);
  const [showLastActivity, setShowLastActivity] = useState(true);
  const [toggleModal, setToggleModal] = useState("hidden");
  const [resetText, setResetText] = useState("");
  const [smartSuggestions, setSmartSuggestions] = useState(true);
  const { bgcolor50, textcolor500, bgcolor500 } = useColorTheme();

  const handleDueDate = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setDueDate(value);
    localStorage.setItem("showDueDate", value);
  };
  const handlePriority = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setShowPriority(value);
    localStorage.setItem("showPriority", value);
  };
  const handleType = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setShowType(value);
    localStorage.setItem("showType", value);
  };
  const handleDeleteGoals = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setDeleteGoals(value);
    localStorage.setItem("deleteInactiveGoals", value);
  };
  const handleSubtask = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setShowSubtask(value);
    localStorage.setItem("alwaysShowSubtask", value);
  };
  const handleGroupby = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setGroupby(value);
    localStorage.setItem("defaultGoalsGroupBy", value);
  };
  const handleDifficulty = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setShowDifficulty(value);
    localStorage.setItem("showDifficulty", value);
  };
  const handleMoveHabits = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setMoveHabits(value);
    localStorage.setItem("moveHabits", value);
  };
  const handleDuration = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setShowDuration(value);
    localStorage.setItem("showDuration", value);
  };
  const handleResetDuration = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setResetHabit(value);
    localStorage.setItem("resetHabit", value);
  };
  const handleLastActivity = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setShowLastActivity(value);
    localStorage.setItem("showLastActivity", value);
  };
  const handleReset = (type) => {
    if (window.location.host == "habitech.noorudd.in") {
      toast("Feature Disabled");
      return;
    }
    if (type == "setting") {
      if (localStorage.getItem("userVibrate") == "true") {
        window.navigator.vibrate(5);
      }
      if (
        window.confirm(
          "Are you sure you want to reset the user preferences? Default settings will be applied."
        )
      ) {
        localStorage.removeItem("showDueDate");
        localStorage.removeItem("showPriority");
        localStorage.removeItem("showType");
        localStorage.removeItem("deleteInactiveGoals");
        localStorage.removeItem("alwaysShowSubtask");
        localStorage.removeItem("defaultGoalsGroupBy");
        localStorage.removeItem("showDifficulty");
        localStorage.removeItem("moveHabits");
        localStorage.removeItem("showDuration");
        localStorage.removeItem("resetHabit");
        localStorage.removeItem("showLastActivity");
        window.location.replace("/");
      }
    }

    if (type == "app") {
      if (
        window.confirm(
          "Are you sure you want to reset the app? This action cannot be undone!"
        )
      ) {
        setToggleModal("");
      }
    }
  };
  const handleResetApp = () => {
    if (resetText != "RESET") {
      toast("Enter correct text", toastError());
      return;
    }
    localStorage.clear();
    axios.put(API_URL, INITIAL_DATA);
    window.location.replace("/");
  };
  const handleSmartSuggestions = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    setSmartSuggestions(value);
    localStorage.setItem("smartSuggestions", value);
  };

  useEffect(() => {
    const settings = {
      showDueDateOnGoals: "showDueDate",
      showPriorityOnGoals: "showPriority",
      showTypeOnGoals: "showType",
      deleteInactiveGoals: "deleteInactiveGoals",
      alwaysShowSubtask: "alwaysShowSubtask",
      defaultGoalsGroupBy: "defaultGoalsGroupBy",
      showDifficultyOnHabits: "showDifficulty",
      moveCompletedHabits: "moveHabits",
      showDurationOnPlans: "showDuration",
      resetHabitDuration: "resetHabit",
      showLastActivity: "showLastActivity",
      smartSuggestions: "smartSuggestions",
    };

    const preferences = {};
    for (const key in settings) {
      preferences[key] = localStorage.getItem(settings[key]);
    }

    if (preferences.showDueDateOnGoals == "false") setDueDate(false);
    if (preferences.showPriorityOnGoals == "false") setShowPriority(false);
    if (preferences.showTypeOnGoals == "false") setShowType(false);
    if (preferences.alwaysShowSubtask == "true") {
      setShowSubtask(true);
    }
    if (preferences.deleteInactiveGoals == null) setDeleteGoals(90);
    if (preferences.defaultGoalsGroupBy != null)
      setGroupby(preferences.defaultGoalsGroupBy);
    if (preferences.showDifficultyOnHabits == "false") setShowDifficulty(false);
    if (preferences.moveCompletedHabits == "true") {
      setMoveHabits(true);
    }
    if (preferences.showDurationOnPlans == "false") setShowDuration(false);
    if (preferences.showLastActivity == "false") setShowLastActivity(false);
    if (preferences.smartSuggestions == "false") setSmartSuggestions(false);
    if (preferences.resetHabitDuration != null)
      setResetHabit(preferences.resetHabitDuration);
  }, []);

  return (
    <>
      <Toaster />
      <div className="mb-24">
        <h1 className={`text-center mt-10 text-2xl font-bold ${textcolor500}`}>
          Let's customize the app! 🛠️
        </h1>
        <p className="text-center text-xs mx-5">
          These settings are stored locally on this device. Default settings
          will be applied if you change the device or clear the site data.
        </p>
        <div className="m-2 mt p-2 bg-gray-700 rounded">
          <h1 className="mb-5 font-bold">GENERAL</h1>
          <div className="flex justify-between mb-2">
            <h1>Show last activity</h1>
            <ToggleButton
              toggle={showLastActivity}
              setToggle={handleLastActivity}
              name=""
            />
          </div>
          <div className="flex justify-between mb-2">
            <h1>Smart Suggestions</h1>
            <ToggleButton
              toggle={smartSuggestions}
              setToggle={handleSmartSuggestions}
              name=""
            />
          </div>
          <div className="mb-2">
            <h1>Reorder tab view</h1>
            <DragAndSort />
          </div>
        </div>
        <div className="m-2 mt p-2 bg-gray-700 rounded">
          <h1 className="mb-5 font-bold">GOALS</h1>
          <div className="flex justify-between mb-2">
            <h1>Show due date by default</h1>
            <ToggleButton
              toggle={showDueDate}
              setToggle={handleDueDate}
              name=""
            />
          </div>

          <div className="flex justify-between mb-2">
            <h1>Show priority by default</h1>
            <ToggleButton
              toggle={showPriority}
              setToggle={handlePriority}
              name=""
            />
          </div>

          <div className="flex justify-between mb-2">
            <h1>Show type by default</h1>
            <ToggleButton toggle={showType} setToggle={handleType} name="" />
          </div>

          <div className="flex justify-between mb-2">
            <h1>Show subtasks by default</h1>
            <ToggleButton
              toggle={showSubtask}
              setToggle={handleSubtask}
              name=""
            />
          </div>

          <div className="flex justify-between mb-2">
            <h1>Delete inactive goals after</h1>
            <select
              value={deleteGoals}
              className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
              onChange={(e) => handleDeleteGoals(e.target.value)}
            >
              <option value="1">1 day</option>
              <option value="7">7 days</option>
              <option value="30">1 month</option>
              <option value="90">3 month</option>
            </select>
          </div>

          <div className="flex justify-between mb-2">
            <h1>Show goals grouped by</h1>
            <select
              value={groupby}
              className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
              onChange={(e) => handleGroupby(e.target.value)}
            >
              <option value="timeline">Timeline</option>
              <option value="type">Type</option>
              <option value="priority">Priority</option>
              <option value="tags">Tags</option>
            </select>
          </div>
        </div>

        <div className="m-2 mt p-2 bg-gray-700 rounded">
          <h1 className="mb-5 font-bold">HABITS</h1>

          <div className="flex justify-between mb-2">
            <h1>Show difficulty</h1>
            <ToggleButton
              toggle={showDifficulty}
              setToggle={handleDifficulty}
              name=""
            />
          </div>

          <div className="flex justify-between mb-2">
            <h1>Move completed habits to bottom</h1>
            <ToggleButton
              toggle={moveHabits}
              setToggle={handleMoveHabits}
              name=""
            />
          </div>

          <div className="flex justify-between mb-2">
            <h1>Reset completed habit after</h1>
            <select
              value={resetHabit}
              className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
              onChange={(e) => handleResetDuration(e.target.value)}
            >
              <option value={360}>6 hours</option>
              <option value={720}>12 hours</option>
              <option value={900}>15 hours</option>
              <option value={1440}>24 hours</option>
            </select>
          </div>
        </div>

        <div className="m-2 mt p-2 bg-gray-700 rounded">
          <h1 className="mb-5 font-bold">PLANS</h1>

          <div className="flex justify-between mb-2">
            <h1>Show duration</h1>
            <ToggleButton
              toggle={showDuration}
              setToggle={handleDuration}
              name=""
            />
          </div>
        </div>

        <div className="m-2 mt p-2 bg-gray-700 rounded">
          <h1 className="mb-5 font-bold">RESET</h1>

          <h1
            className="mb-2 text-red-500"
            onClick={() => handleReset("setting")}
          >
            Reset Settings
          </h1>
          <h1 className="mb-2 text-red-500" onClick={() => handleReset("app")}>
            Reset App
          </h1>
          {toggleModal != "hidden" && (
            <Modal
              toggleModal={toggleModal}
              setToggleModal={handleResetApp}
              heading={"DELETE EVERYTHING?"}
            >
              <div className="p-2">
                <h1 className="p-2">
                  This will permanently delete all the data including but not
                  limited to plans, tasks, habits, goals, settings, coins, exp,
                  activity amd more. This action is irreversible!
                </h1>
                <h1 className="p-2">
                  To confirm the action type 'RESET' and submit.
                </h1>

                <div className="text-center">
                  <input
                    type="text"
                    value={resetText}
                    className="my-1 p-1 border w-3/4 text-md rounded-md bg-gray-600 border-gray-600 text-white"
                    onChange={(e) => setResetText(e.target.value)}
                    required
                  />

                  <div className="my-5">
                    <button
                      type="button"
                      className={`text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${bgcolor500} mr-5`}
                      onClick={() => setToggleModal("hidden")}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-700 ml-5`}
                      onClick={handleResetApp}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvancedSetting;
