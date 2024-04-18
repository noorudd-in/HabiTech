import { useState } from "react";
import { useColorTheme } from "../../hooks/useColorTheme";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../common/Toast";

const Adjustment = ({
  defaultTimer,
  task,
  setDefaultTimer,
  setTime,
  setToggleAdjustment,
  setTask,
}) => {
  const [timer, setTimer] = useState(defaultTimer);
  const { bgcolor500 } = useColorTheme();

  const handleSetting = () => {
    if (timer < 5 || timer > 180) {
      toast("Duration must be between 5 mins to 180 mins.", toastError());
      return;
    }
    localStorage.setItem("defaultTimer", timer);
    setDefaultTimer(timer);
    setTime(`${timer} : 00`);
    setToggleAdjustment(false);
  };

  return (
    <div>
      <Toaster />
      <div className="p-5 md:p-q space-y-1">
        <label className="text-base block" htmlFor="habit">
          Set Duration (in Mins)
        </label>
        <input
          id="habit"
          type="number"
          value={timer}
          className="my-1 p-1 border text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Value between 5 - 180"
          onChange={(e) => setTimer(e.target.value)}
          required
        />

        <label className="mt-2 text-base block" htmlFor="taskname">
          Task Name (Optional)
        </label>
        <input
          id="taskname"
          type="text"
          value={task}
          className="my-1 p-1 border w-3/4 text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Study Time"
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </div>

      <div className="text-center">
        <button
          type="button"
          className={`text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${bgcolor500}`}
          onClick={handleSetting}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Adjustment;
