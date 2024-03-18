import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { useNavigate, useParams } from "react-router-dom";
import { useColorTheme } from "../hooks/useColorTheme";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../components/common/Toast";
import { API_URL } from "../constants";
import { useSound } from "../hooks/useSound";
import dayjs from "dayjs";
import axios from "axios";

const EditPlanPage = () => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [repeat, setRepeat] = useState("");
  const [date, setDate] = useState(Date.now());
  const [description, setDescription] = useState("");
  const [toggleDuration, setToggleDuration] = useState("time");
  const [toggleRepeat, setToggleRepeat] = useState("");
  const [toggleDate, setToggleDate] = useState("today");
  const [durationValue, setDurationValue] = useState("select");
  const { state, dispatch } = useContext(HabitechContext);
  const { bgcolor500, border400, lighttext, textcolor500 } = useColorTheme();
  const navigate = useNavigate();
  let { id } = useParams();

  let today = dayjs();
  let yesterday = today.subtract(1, "day");
  let tomorrow = today.add(1, "day");

  const setNow = () => {
    let now = new Date().toLocaleTimeString().slice(0, 5);
    setStart(now);
  };

  const setDuration = (value) => {
    // Redirect user to select custom time if dropdown is custom!
    if (value == "custom") {
      setToggleDuration("time");
      return;
    }
    setDurationValue(value);
    const num = value.slice(0, 2);
    const type = value.slice(2, 3) == "M" ? "minute" : "hour";
    const startTime = dayjs().hour(start.slice(0, 2)).minute(start.slice(3, 5));
    const endTime = startTime.add(parseInt(num), type);
    setEnd(endTime.toDate().toLocaleTimeString().slice(0, 5));
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

  const updatePlan = () => {
    if (state.user.vibrate) {
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

    let newPlans = [...state.plans];
    newPlans.map((plan) => {
      if (plan.id == id) {
        plan.name = name;
        plan.start = start;
        plan.end = end;
        plan.date = date;
        plan.repeat = repeat;
        plan.description = description;
        plan.lastUpdated = Date.now();
      }
    });

    let newActivity = {
      action: "edit",
      type: "plan",
      name: name,
      time: Date.now(),
    };

    if (state.user.sound.enable) {
      const sound = useSound(state.user.sound.currentSound);
      sound.volume = state.user.sound.volume;
      sound.play();
    }

    axios
      .put(API_URL, {
        ...state,
        plans: newPlans,
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
        navigate("/?toastType=toastSuccess&toastMessage=Plan Updated!");
      });
  };

  const deletePlan = () => {
    if (state.user.vibrate) {
      window.navigator.vibrate(5);
    }
    if (window.confirm(`Are you sure you want to delete the plan: ${name}?`)) {
      let newPlans = state.plans.filter((plan) => {
        return plan.id != id;
      });

      let newActivity = {
        action: "delete",
        type: "plan",
        name: name,
        time: Date.now(),
      };

      if (state.user.sound.enable) {
        const sound = useSound(state.user.sound.currentSound);
        sound.volume = state.user.sound.volume;
        sound.play();
      }

      axios
        .put(API_URL, {
          ...state,
          plans: newPlans,
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
          navigate("/?toastType=toastError&toastMessage=Plan Deleted!");
        });
    }
  };

  // Find the plan by ID and autofill the details
  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    } else {
      for (const plan of state.plans) {
        if (plan.id == id) {
          setName(plan.name);
          setStart(plan.start);
          setEnd(plan.end);
          setDate(plan.date);
          setDescription(plan.description);
          setRepeat(plan.repeat);
          setToggleRepeat(plan.repeat);

          if (plan.repeat == "daily") {
            setToggleDate("today");
          } else {
            if (new Date(plan.date).getDate() != tomorrow.date()) {
              setToggleDate("today");
            } else {
              setToggleDate("tomorrow");
            }
          }

          // Set dropdown value after calculating duration from start to end time.
          const startTime = plan.start.split(":");
          const endTime = plan.end.split(":");
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
          break;
        }
      }
    }
  }, []);
  return (
    <>
      <Toaster />
      <div
        className={`text-center mt-10 ml-5 text-2xl font-bold ${textcolor500}`}
      >
        <h1>Whoopsie... Let's fix this plan!</h1>
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
            className="my-1 p-1 border w-3/4 text-black text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Repair Fan"
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
            className="text-black dark:text-white p-1 rounded dark:bg-gray-700 dark:border-gray-600"
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
                    value={durationValue}
                    id="type"
                    className=" my-1 p-1 border border-gray-300 text-gray-900 text-md rounded-md block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="select">Select</option>
                    <option value="05M">5 minutes</option>
                    <option value="10M">10 minutes</option>
                    <option value="15M">15 minutes</option>
                    <option value="30M">30 minutes</option>
                    <option value="45M">45 minutes</option>
                    <option value="01H">1 hour</option>
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
                    className="text-black dark:text-white p-1 rounded dark:bg-gray-700 dark:border-gray-600"
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
                      : "border-gray-700 dark:bg-gray-800 dark:text-white"
                  }`}
                >
                  Once
                </button>
                <button
                  onClick={() => settingRepeat("daily")}
                  className={`px-2 py-1 border rounded-e-lg ${
                    toggleRepeat == "daily"
                      ? bgcolor500 + " " + border400 + " " + "text-gray-900"
                      : "border-gray-700 dark:bg-gray-800 dark:text-white"
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
                      : "border-gray-700 dark:bg-gray-800 dark:text-white"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => settingDate("tomorrow")}
                  className={`px-2 py-1 border rounded-e-lg ${
                    toggleDate == "tomorrow"
                      ? bgcolor500 + " " + border400 + " " + "text-gray-900"
                      : "border-gray-700 dark:bg-gray-800 dark:text-white"
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
            className="my-1 p-1 border w-3/4 text-black text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Call electrician and repair the fan."
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <button
            className={`text-center my-3 p-2 ${bgcolor500} ${lighttext} text-lg rounded-lg items-center`}
            onClick={updatePlan}
          >
            Update
          </button>

          <span className="mx-5">OR</span>

          <button
            onClick={deletePlan}
            className="text-center my-3 p-2 text-black bg-red-500 text-lg rounded-lg items-center"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPlanPage;
