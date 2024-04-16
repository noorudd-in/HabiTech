import { useContext, useState, useEffect } from "react";
import { useColorTheme } from "../hooks/useColorTheme";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../components/common/Toast";
import { HabitechContext } from "../contexts/HabitechContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL, CLOUD_AUDIO_PATH } from "../constants";
import dayjs from "dayjs";
import axios from "axios";

const smartLabels = [
  "Morning Exercise",
  "Breakfast",
  "Work Meeting",
  "Lunch",
  "Afternoon Task",
  "Evening Walk",
  "Dinner",
  "Reading Time",
  "Bedtime",
  "Morning Meditation",
  "Coffee Break",
  "Afternoon Meeting",
  "Snack Time",
  "Yoga Session",
  "Evening Relaxation",
  "Meal Prep",
  "Evening Skincare",
  "Learning Time",
  "Family Time",
  "Night Routine",
];
const smartDescriptions = [
  "30 minutes of jogging in the park",
  "Healthy smoothie and oatmeal",
  "Discuss project updates with the team",
  "Grilled chicken salad",
  "Complete presentation slides",
  "20 minutes walk around the neighborhood",
  "Salmon with roasted vegetables",
  "Read a chapter of a book",
  "Meditation and sleep by 10:30 PM",
  "10 minutes of mindfulness meditation",
  "Enjoy a cup of coffee or tea",
  "Review quarterly goals",
  "Fruit and nuts",
  "45 minutes of yoga practice",
  "Listen to calming music",
  "Prepare meals for the next day",
  "Cleanse, tone, and moisturize",
  "Online course or tutorial",
  "Spend time with family or friends",
  "Brush teeth and prepare for bed",
];

const CreatePlanPage = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [repeat, setRepeat] = useState("once");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(Date.now());
  const [toggleDuration, setToggleDuration] = useState("time");
  const [toggleRepeat, setToggleRepeat] = useState("once");
  const [toggleDate, setToggleDate] = useState("today");
  const [durationValue, setDurationValue] = useState("select");
  const [randomIndex, setRandomIndex] = useState(0);
  const [urlParams] = useSearchParams();
  const { bgcolor500, border400, textcolor500 } = useColorTheme();
  const navigate = useNavigate();

  const setNow = () => {
    let hh = dayjs().hour();
    let mm = dayjs().minute();
    if (String(hh).length == 1) {
      hh = "0" + parseInt(hh);
    }
    setStart(hh + ":" + mm);
  };

  const setDuration = (value) => {
    // Redirect user to select custom time if dropdown is custom!
    if (value == "custom") {
      setToggleDuration("time");
      return;
    }
    const num = value.slice(0, 2);
    const type = value.slice(2, 3) == "M" ? "minute" : "hour";
    const startTime = dayjs().hour(start.slice(0, 2)).minute(start.slice(3, 5));
    const endTime = startTime.add(parseInt(num), type);
    setEnd(endTime.toDate().toLocaleTimeString().slice(0, 5));
    setDurationValue(value);
  };

  const settingRepeat = (value) => {
    setToggleRepeat(value);
    setRepeat(value);
  };

  const settingDate = (value) => {
    setToggleDate(value);
    if (value == "today") {
      setDate(Date.now());
    }
    if (value == "tomorrow") {
      const tomorrow = dayjs().add(1, "day");
      setDate(tomorrow.valueOf());
    }
  };

  // If user select custom time then calculate the duration and set dropdown based on the value
  const settingEndTime = (value) => {
    setEnd(value);
    const startTime = start.split(":");
    const endTime = value.split(":");
    const startDate = dayjs().hour(startTime[0]).minute(startTime[1]);
    const endDate = dayjs().hour(endTime[0]).minute(endTime[1]);
    const totalMinutes = endDate.diff(startDate, "minute");
    let durationvalue = "";
    if (totalMinutes == 5) durationvalue = "05M";
    if (totalMinutes == 10) durationvalue = "10M";
    if (totalMinutes == 15) durationvalue = "15M";
    if (totalMinutes == 30) durationvalue = "30M";
    if (totalMinutes == 45) durationvalue = "45M";
    if (totalMinutes == 60) durationvalue = "01H";
    if (totalMinutes == 120) durationvalue = "02H";
    if (totalMinutes == 480) durationvalue = "08H";
    if (durationvalue == "") {
      setDurationValue("custom");
    } else {
      setDurationValue(durationvalue);
    }
  };

  // Ensure if end time is after the start time.
  const validateTime = () => {
    const startTime = start.split(":");
    const endTime = end.split(":");
    if (endTime[0] < startTime[0]) {
      return false;
    }
    if (startTime[0] == endTime[0]) {
      if (endTime[1] < startTime[1]) {
        return false;
      }
    }
    return true;
  };

  const createPlan = () => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    //Check is state is loaded or not;
    if (state.user.name == undefined) {
      window.location.replace("/");
      return;
    }
    if (name == "") {
      toast("You forget to enter the name!", toastError());
      return;
    }
    if (start == "") {
      toast("You forget to enter the start date!", toastError());
      return;
    }
    if (end == "") {
      toast("You forget to enter the end date!", toastError());
      return;
    }
    if (!validateTime()) {
      toast("It seems end time is before the start time!", toastError());
      return;
    }
    // Create Plan object and perform API Call.
    let newPlan = {
      id: Date.now(),
      name: name,
      start: start,
      end: end,
      date: date,
      repeat: repeat,
      description: description,
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
        `${CLOUD_AUDIO_PATH + localStorage.getItem("userCurrentSound")}.mp3`
      );
      sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
      sound.play();
    }

    axios
      .put(API_URL, {
        ...state,
        plans: [...state.plans, newPlan],
        activity: [...state.activity, newActivity],
        lastEdited: Date.now(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            plans: res?.data?.plans,
            activity: res?.data?.activity,
            lastEdited: res?.data?.lastEdited,
          },
        });
        navigate("/?toastType=toastSuccess&toastMessage=New plan created!");
      });
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
    if (urlParams.get("name") != null) {
      setName(urlParams.get("name"));
    }
    if (urlParams.get("start") != null) {
      setStart(urlParams.get("start"));
    }
    if (urlParams.get("end") != null) {
      setEnd(urlParams.get("end"));
    }
    if (urlParams.get("repeat") != null) {
      setToggleRepeat(urlParams.get("repeat"));
      setRepeat(urlParams.get("repeat"));
    }
    if (urlParams.get("description") != null) {
      setDescription(urlParams.get("description"));
    }
    setRandomIndex(Math.floor(Math.random() * 19));
  }, []);

  return (
    <>
      <Toaster />
      {/* Heading */}
      <div
        className={`text-center mt-10 ml-5 text-2xl font-bold ${textcolor500}`}
      >
        <h1>Let's create a plan for you!</h1>
      </div>
      <div className="ml-5 mt-2">
        <div>
          <label className="text-xl flex" htmlFor="planname">
            What's on your mind?
            <p className="text-red-500 ml-1">*</p>
          </label>
          <input
            id="planname"
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

          <label className="text-xl flex mt-3" htmlFor="starttime">
            Starting When?
            <p className="text-red-500 ml-1">*</p>
          </label>
          <p
            className="mb-2 underline underline-offset-4 cursor-pointer font-thin text-sm"
            onClick={setNow}
          >
            Set current time
          </p>
          <input
            id="starttime"
            type="time"
            value={start}
            max="23:55"
            className="text-white p-1 rounded bg-gray-700 border-gray-600"
            onChange={(e) => setStart(e.target.value)}
          />

          {start !== "" && (
            <>
              <label className="text-xl flex mt-3" htmlFor="endtime">
                How Long?
                <p className="text-red-500 ml-1">*</p>
              </label>
              {toggleDuration == "duration" ? (
                <p
                  className="mt-1 mb-2 underline underline-offset-4 cursor-pointer font-thin text-sm"
                  onClick={() => setToggleDuration("time")}
                >
                  Set custom time
                </p>
              ) : (
                <p
                  className="mt-1 mb-2 underline underline-offset-4 cursor-pointer font-thin text-sm"
                  onClick={() => setToggleDuration("duration")}
                >
                  Set duration
                </p>
              )}

              {toggleDuration == "duration" && (
                <div>
                  <select
                    id="type"
                    value={durationValue}
                    className=" my-1 p-1 border text-md rounded-md block bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="select">Select</option>
                    <option value="05M">5 minutes</option>
                    <option value="10M">10 minutes</option>
                    <option value="15M">15 minutes</option>
                    <option value="30M">30 minutes</option>
                    <option value="45M">45 minutes</option>
                    <option value="01H">1 hours</option>
                    <option value="02H">2 hours</option>
                    <option value="08H">8 hours</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              )}

              {toggleDuration == "time" && (
                <div>
                  <input
                    id="endtime"
                    type="time"
                    value={end}
                    min={start}
                    max="23:55"
                    className="text-white p-1 rounded bg-gray-700 border-gray-600"
                    onChange={(e) => settingEndTime(e.target.value)}
                  />
                </div>
              )}
            </>
          )}

          <div className="flex">
            <div>
              <label className="text-xl flex mt-3" htmlFor="repeat">
                How Often?
                <p className="text-red-500 ml-1">*</p>
              </label>
              <div className="mt-1">
                <button
                  onClick={() => settingRepeat("once")}
                  className={`px-2 py-1 border rounded-s-lg ${
                    toggleRepeat == "once"
                      ? bgcolor500 + " " + border400 + " " + "text-gray-900"
                      : "border-gray-700 bg-gray-800 text-white"
                  }`}
                >
                  Once
                </button>
                <button
                  onClick={() => settingRepeat("daily")}
                  className={`px-2 py-1 border rounded-e-lg ${
                    toggleRepeat == "daily"
                      ? bgcolor500 + " " + border400 + " " + "text-gray-900"
                      : "border-gray-700 bg-gray-800 text-white"
                  }`}
                >
                  Daily
                </button>
              </div>
            </div>
            <div className="ml-10">
              <label className="text-xl flex mt-3" htmlFor="repeat">
                Doing Today?
                <p className="text-red-500 ml-1">*</p>
              </label>
              <div className="mt-1">
                <button
                  onClick={() => settingDate("today")}
                  className={`px-2 py-1 border rounded-s-lg ${
                    toggleDate == "today"
                      ? bgcolor500 + " " + border400 + " " + "text-gray-900"
                      : "border-gray-700 bg-gray-800 text-white"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => settingDate("tomorrow")}
                  className={`px-2 py-1 border rounded-e-lg ${
                    toggleDate == "tomorrow"
                      ? bgcolor500 + " " + border400 + " " + "text-gray-900"
                      : "border-gray-700 bg-gray-800 text-white"
                  }`}
                >
                  Tomorrow
                </button>
              </div>
            </div>
          </div>

          <label className="text-xl block mt-3" htmlFor="description">
            Tell me more!
          </label>
          <textarea
            id="description"
            type="text"
            value={description}
            className="my-1 p-1 border w-3/4 text-md rounded-md text-white bg-gray-700 border-gray-600 placeholder-gray-400 "
            placeholder={
              localStorage.getItem("smartSuggestions") == "false"
                ? ""
                : smartDescriptions[randomIndex]
            }
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          className={`text-center my-3 p-2 ${bgcolor500} text-black text-lg rounded-lg items-center`}
          onClick={createPlan}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreatePlanPage;
