import { useContext, useState, useEffect, lazy, Suspense } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../components/common/Toast";
import { API_URL, CLOUD_AUDIO_PATH } from "../constants/index";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const smartLabels = [
  "Learn a new language",
  "Run a half-marathon",
  "Read 24 books in a year",
  "Save 1 Lakhs rupees",
  "Lose 10 pounds",
  "Travel to 5 new countries",
  "Complete a coding bootcamp",
  "Meditate daily",
  "Learn to play the guitar",
  "Start a side hustle",
  "Complete a 30-day fitness challenge",
  "Volunteer for a cause",
  "Learn to cook 10 new recipes",
  "Complete a digital detox",
  "Earn a professional certification",
  "Improve time management skills",
  "Start a daily journal",
  "Attend a personal development seminar",
  "Achieve a promotion at work",
  "Improve flexibility",
];

const smartSuggestions = [
  "Achieve conversational fluency in Spanish within 6 months.",
  "Complete a half-marathon in under 2 hours by the end of the year.",
  "Read 2 books per month for personal development and leisure.",
  "Save 1 lakh rupees for emergency funds and future investments.",
  "Achieve a weight loss of 10 pounds in 3 months through regular exercise and a balanced diet.",
  "Explore and visit 5 new countries for cultural experiences.",
  "Finish an online coding bootcamp and master a new programming language.",
  "Practice meditation for at least 10 minutes daily for mental well-being.",
  "Master basic guitar chords and play 5 songs within 6 months.",
  "Launch a part-time business or freelancing gig to generate additional income.",
  "Participate in a 30-day fitness challenge to improve overall health and fitness levels.",
  "Dedicate 50 hours to volunteering for a charitable cause or organization.",
  "Experiment and master 10 new recipes to diversify cooking skills.",
  "Take a 7-day break from social media and digital devices for mental clarity.",
  "Obtain a professional certification in a relevant field to enhance career prospects.",
  "Implement effective time management strategies to increase productivity.",
  "Maintain a daily journal to reflect on personal growth and experiences.",
  "Participate in a personal development seminar or workshop to gain new insights.",
  "Demonstrate outstanding performance and skills to secure a promotion within the next year.",
  "Engage in regular stretching and flexibility exercises to improve overall flexibility.",
];

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
  const [randomIndex, setRandomIndex] = useState(0);
  const [urlParams] = useSearchParams();

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

    let updatedAnalytics = { ...state.user.analytics };
    updatedAnalytics.goals[type][0] = updatedAnalytics.goals[type][0] + 1;
    updatedAnalytics.goals[priority][0] =
      updatedAnalytics.goals[priority][0] + 1;
    updatedAnalytics.goals.total[0] = updatedAnalytics.goals.total[0] + 1;

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
    if (urlParams.get("name") != null) {
      setName(urlParams.get("name"));
    }
    if (urlParams.get("type") != null) {
      setType(urlParams.get("type"));
    }
    if (urlParams.get("priority") != null) {
      setPriority(urlParams.get("priority"));
    }
    if (urlParams.get("duedate") != null) {
      setDuedate(new Date(Number(urlParams.get("duedate"))));
    }
    if (urlParams.get("tags") != null) {
      setTags(JSON.parse(urlParams.get("tags")));
    }
    if (urlParams.get("subtasks") != null) {
      setTask(JSON.parse(urlParams.get("subtasks")));
    }
    if (urlParams.get("description") != null) {
      setDescription(urlParams.get("description"));
    }
    setRandomIndex(Math.floor(Math.random() * 19));
  }, []);

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
          placeholder={
            localStorage.getItem("smartSuggestions") == "false"
              ? ""
              : smartLabels[randomIndex]
          }
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
          placeholder={
            localStorage.getItem("smartSuggestions") == "false"
              ? ""
              : smartSuggestions[randomIndex]
          }
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
              value={type}
              className=" my-1 p-1 w-3/4 border text-md rounded-md block bg-gray-700 border-gray-600 text-white"
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
              value={priority}
              className=" my-1 p-1 w-3/4 border text-md rounded-md block bg-gray-700 border-gray-600 text-white"
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
