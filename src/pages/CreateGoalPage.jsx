import { useContext, useState, useEffect, lazy, Suspense } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../components/common/Toast";
import { API_URL } from "../constants/index";
import { useNavigate } from "react-router-dom";
import { useColorTheme } from "../hooks/useColorTheme";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerCalenderIcon from "../components/icons/DatePickerCalenderIcon";
import dayjs from "dayjs";
const SelectTagsForGoal = lazy(() =>
  import("../components/goal/SelectTagsForGoal")
);
const CreateSubtaskForGoal = lazy(() =>
  import("../components/goal/CreateSubtaskForGoal")
);
const AvailableTags = lazy(() => import("../components/common/AvailableTags"));
const AvailableSubtask = lazy(() =>
  import("../components/common/AvailableSubtask")
);
const Modal = lazy(() => import("../components/common/Modal"));
import Shimmer from "./Shimmer";

const CreateGoalPage = () => {
  const { bgcolor500, textcolor500 } = useColorTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [duedate, setDuedate] = useState("");
  const [tags, setTags] = useState([]);
  const [task, setTask] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [toggleModal, setToggleModal] = useState("hidden");

  const { state, dispatch } = useContext(HabitechContext);
  const navigate = useNavigate();

  const toggleDropdown = (type) => {
    setToggleModal("");
    setDropdown(type);
  };

  const handleCreateGoal = () => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
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
      type: type,
      status: 0,
      priority: priority,
      tags: tags,
      description: description,
      subtasks: task,
      lastUpdated: Date.now(),
    };

    let newActivity = {
      action: "create",
      type: "goal",
      name: name,
      time: Date.now(),
    };

    if (localStorage.getItem("userSound") == "true") {
      const sound = new Audio(
        `../../../assets/sounds/${localStorage.getItem("userCurrentSound")}.mp3`
      );
      sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
      sound.play();
    }

    axios
      .put(API_URL, {
        ...state,
        goals: [...state.goals, newGoal],
        activity: [...state.activity, newActivity],
        lastEdited: Date.now(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            goals: res?.data?.goals,
            activity: res?.data?.activity,
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
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
  });

  return (
    <>
      <Toaster />
      <div
        className={`text-center mt-10 ml-5 text-2xl font-bold ${textcolor500}`}
      >
        <h1>Let's create a goal for you!</h1>
      </div>

      <div className="ml-5 mt-2 mb-40">
        <label className="text-xl flex" htmlFor="goalname">
          Goal Name
          <p className="text-red-500 ml-1">*</p>
        </label>
        <input
          id="goalname"
          type="text"
          value={name}
          className="my-1 p-1 border w-3/4 text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
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
          className="my-1 p-1 border w-3/4  text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
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
              className=" my-1 p-1 w-3/4 border text-md rounded-md block bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="select">Select</option>
              <option value="short">Short Term</option>
              <option value="mid">Mid Term</option>
              <option value="long">Long Term</option>
            </select>
          </div>

          <div className="w-2/4">
            <label className="text-xl flex mt-2" htmlFor="priority">
              Priority
              <p className="text-red-500 ml-1">*</p>
            </label>
            <select
              id="priority"
              className=" my-1 p-1 w-3/4 border text-md rounded-md block bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
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
            onChange={(date) => setDuedate(date)}
            minDate={dayjs().format("YYYY-MM-DD")}
            placeholderText="Select Due Date"
            onFocus={(e) => (e.target.readOnly = true)}
            className="my-1 p-1 border text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
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
          <button
            className={`mb-3 underline underline-offset-4 text-sm font-medium text-center text-black ${textcolor500}`}
            type="button"
            onClick={() => toggleDropdown("add-tag")}
          >
            Add a tag
          </button>
          {tags[0] == undefined ? (
            <p>No tags found.</p>
          ) : (
            <Suspense fallback={<Shimmer />}>
              <AvailableTags
                tagData={tags}
                deleteIcon={true}
                handleDelete={handleDeleteTag}
              />
            </Suspense>
          )}
        </div>

        <label className="text-xl block mt-2" htmlFor="type">
          Sub-tasks
        </label>
        <div>
          <button
            className={`mb-3 underline underline-offset-4 text-sm font-medium text-center text-black ${textcolor500}`}
            type="button"
            onClick={() => toggleDropdown("add-task")}
          >
            Add a subtask
          </button>
          {task[0] == undefined ? (
            <p>No sub-tasks found.</p>
          ) : (
            <Suspense fallback={<Shimmer />}>
              <AvailableSubtask taskData={task} setTask={setTask} task={task} />
            </Suspense>
          )}
        </div>

        <button
          className={`text-center my-3 p-2 ${bgcolor500} text-black text-lg rounded-lg items-center`}
          type="button"
          onClick={handleCreateGoal}
        >
          Create
        </button>

        {/* Modal */}
        {toggleModal != "hidden" && (
          <Suspense fallback={<Shimmer />}>
            <Modal
              toggleModal={toggleModal}
              setToggleModal={setToggleModal}
              heading={"Add Tags"}
              footer={"Done"}
            >
              <div className="p-5 md:p-q space-y-1">
                {dropdown == "add-tag" && (
                  <Suspense fallback={<Shimmer />}>
                    <SelectTagsForGoal
                      allTags={state.availableTags}
                      tags={tags}
                      setTags={setTags}
                    />
                  </Suspense>
                )}
                {dropdown == "add-task" && (
                  <Suspense fallback={<Shimmer />}>
                    <CreateSubtaskForGoal task={task} setTask={setTask} />
                  </Suspense>
                )}
              </div>
            </Modal>
          </Suspense>
        )}
      </div>
    </>
  );
};

export default CreateGoalPage;
