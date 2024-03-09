import { useState } from "react";
import { toast } from "react-hot-toast";
import { toastError } from "../common/Toast";
import { useColorTheme } from "../../hooks/useColorTheme";

const CreateSubtaskForGoal = ({ task, setTask }) => {
  const [taskValue, setTaskValue] = useState("");
  const { bgcolor500, lighttext } = useColorTheme();

  const handleTasks = () => {
    if (taskValue == "") {
      toast("Task name is empty!", toastError());
      return;
    }
    let newTask = [
      ...task,
      {
        id: Date.now(),
        name: taskValue,
        status: 0,
      },
    ];
    setTask(newTask);
    setTaskValue("");
  };
  return (
    <div className="m-2 text-center">
      <input
        type="text"
        value={taskValue}
        className="my-1 p-1 border w-3/4 text-black text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Enter task name"
        onChange={(e) => setTaskValue(e.target.value)}
        required
      />
      <button
        type="button"
        className={`${lighttext} font-medium rounded-lg text-sm px-5 py-2.5 text-center ${bgcolor500} mt-2`}
        onClick={handleTasks}
      >
        Add Task
      </button>
      <p className="text-xs mt-3">
        Breakdown your bigger goal into smaller sub-tasks!
      </p>
    </div>
  );
};

export default CreateSubtaskForGoal;
