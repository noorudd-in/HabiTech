import { useContext, useState, useEffect } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../components/common/Toast";
import { API_URL } from "../constants/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerCalenderIcon from "../components/icons/DatePickerCalenderIcon";
import dayjs from "dayjs";
import SelectTagsForGoal from "../components/goal/SelectTagsForGoal";
import CreateSubtaskForGoal from "../components/goal/CreateSubtaskForGoal";
import AvailableTags from "../components/common/AvailableTags";
import { useColorTheme } from "../hooks/useColorTheme";
import AvailableSubtask from "../components/common/AvailableSubtask";

const CreateGoalPage = () => {
  const { bgcolor500, lighttext } = useColorTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [duedate, setDuedate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [tags, setTags] = useState([]);
  const [task, setTask] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [toggleModal, setToggleModal] = useState("hidden");

  const { state, dispatch } = useContext(HabitechContext);
  const navigate = useNavigate();

  const setGoalType = (type) => {
    setType(type);
    if (type == "weekly") {
      setMaxDate(dayjs().add(1, "week").format("YYYY-MM-DD"));
    }
    if (type == "monthly") {
      setMaxDate(dayjs().add(1, "month").format("YYYY-MM-DD"));
    }
    if (type == "quarterly") {
      setMaxDate(dayjs().add(3, "month").format("YYYY-MM-DD"));
    }
    if (type == "yearly") {
      setMaxDate(dayjs().add(1, "year").format("YYYY-MM-DD"));
    }
  };

  const setDueDate = (date) => {
    if (type == "" || type == "select") {
      toast("First select the goal type.", toastError());
      return;
    }
    setDuedate(date);
  };

  const toggleDropdown = (type) => {
    setToggleModal("");
    setDropdown(type);
  };

  const handleCreateGoal = () => {
    if (name == "") {
      toast("Goal name is empty!", toastError());
      return;
    }

    if (type == "" || type == "select") {
      toast("Please select the goal's type.", toastError());
      return;
    }

    if (priority == "" || priority == "select") {
      toast("Please select the goal's priority.", toastError());
      return;
    }

    if (duedate == "") {
      toast("Please select the goal's due-date.", toastError());
      return;
    }

    let newGoal = {
      id: Date.now(),
      name: name,
      duedate: Date.parse(duedate),
      timeline: type,
      status: 0,
      priority: priority,
      tags: tags,
      description: description,
      subtasks: task,
      lastUpdated: 0,
    };

    axios
      .put(API_URL, {
        ...state,
        goals: [...state.goals, newGoal],
        lastEdited: Date.now(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            goals: res?.data?.goals,
            lastEdited: res?.data?.lastEdited,
          },
        });
        navigate("/?toastType=toastSuccess&toastMessage=New goal created!");
      });
  };

  const handleDeleteTag = (givenTag) => {
    let newTags = tags.filter((tag) => {
      return tag != givenTag;
    });
    setTags(newTags);
    console.log("Done");
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      navigate("/");
    }
  });

  return (
    <>
      <Toaster />
      <div className="ml-5 mt-10">
        <label className="text-xl flex" htmlFor="goalname">
          Goal Name
          <p className="text-red-500 ml-1">*</p>
        </label>
        <input
          id="goalname"
          type="text"
          value={name}
          className="my-1 p-1 border w-3/4 text-black text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Email all students"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="text-xl block mt-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          type="text"
          value={description}
          className="my-1 p-1 border w-3/4 text-black text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Make an excel sheet with name and roll number of all students"
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <div className="flex">
          <div className="w-2/4">
            <label className="text-xl flex mt-2" htmlFor="type">
              Type
              <p className="text-red-500 ml-1">*</p>
            </label>
            <select
              id="type"
              className=" my-1 p-1 w-3/4 border border-gray-300 text-gray-900 text-md rounded-md block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => setGoalType(e.target.value)}
            >
              <option value="select">Select</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="w-2/4">
            <label className="text-xl flex mt-2" htmlFor="priority">
              Priority
              <p className="text-red-500 ml-1">*</p>
            </label>
            <select
              id="priority"
              className=" my-1 p-1 w-3/4 border border-gray-300 text-gray-900 text-md rounded-md block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="select">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <label className="text-xl flex mt-2" htmlFor="type">
          Due Date
          <p className="text-red-500 ml-1">*</p>
        </label>
        <div className="flex">
          <div className="mt-2 mr-1">
            <DatePickerCalenderIcon />
          </div>
          <DatePicker
            selected={duedate}
            onChange={(date) => setDueDate(date)}
            minDate={dayjs().format("YYYY-MM-DD")}
            maxDate={maxDate}
            placeholderText="Select Due Date"
            onFocus={(e) => (e.target.readOnly = true)}
            className="my-1 p-1 border text-black text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <div className="text-center text-red-500">
              {type == "weekly" && <h1>Select any date in a week</h1>}
              {type == "monthly" && <h1>Select any date in a month</h1>}
              {type == "quarterly" && <h1>Select any date in a quarter</h1>}
              {type == "yearly" && <h1>Select any date in a year</h1>}
            </div>
          </DatePicker>
        </div>

        <label className="text-xl block mt-2" htmlFor="type">
          Tags
        </label>
        <div>
          {tags[0] == undefined ? (
            <p>No tags found.</p>
          ) : (
            <AvailableTags
              tagData={tags}
              deleteIcon={true}
              handleDelete={handleDeleteTag}
            />
          )}
        </div>

        <label className="text-xl block mt-2" htmlFor="type">
          Sub-tasks
        </label>
        <div>
          {task[0] == undefined ? (
            <p>No sub-tasks found.</p>
          ) : (
            <AvailableSubtask taskData={task} setTask={setTask} task={task} />
          )}
        </div>

        <div className="text-center mt-5">
          <button
            className={`mr-5 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black ${bgcolor500} rounded-lg`}
            type="button"
            onClick={() => toggleDropdown("add-tag")}
          >
            Add a tag
          </button>
          <button
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black ${bgcolor500} rounded-lg`}
            type="button"
            onClick={() => toggleDropdown("add-task")}
          >
            Add subtask
          </button>
        </div>

        <div id="createGoal" className="text-center mt-5">
          <button
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black ${bgcolor500} rounded-lg`}
            type="button"
            onClick={handleCreateGoal}
          >
            Create Goal
          </button>
        </div>

        {/* Modal */}
        <div>
          <div
            className={`${toggleModal} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-300 bg-opacity-50`}
          >
            <div className="mx-10 lg:mx-40 my-32 relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="text-center p-4 md:p-5 rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Tags
                </h3>
              </div>

              <div>
                {dropdown == "add-tag" && (
                  <SelectTagsForGoal
                    allTags={state.availableTags}
                    tags={tags}
                    setTags={setTags}
                  />
                )}
                {dropdown == "add-task" && (
                  <CreateSubtaskForGoal task={task} setTask={setTask} />
                )}
              </div>

              <div className="text-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className={`${lighttext} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${bgcolor500}`}
                  onClick={() => setToggleModal("hidden")}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGoalPage;
