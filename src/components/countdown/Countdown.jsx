import { Suspense, lazy, useEffect, useState } from "react";
import {
  CircularProgressbar as Circle,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useColorTheme } from "../../hooks/useColorTheme";
import dayjs from "dayjs";
import AdjustmentIcon from "../icons/AdjustmentIcon";
import Shimmer from "../../pages/Shimmer";
const Adjustment = lazy(() => import("./Adjustment"));
const TimerSuccess = new Audio(
  "https://res.cloudinary.com/dfwyvvvdp/video/upload/v1713193504/audio/pomodoro/timer-completed_eltgvm.mp3"
);

const Countdown = () => {
  const [defaultTimer, setDefaultTimer] = useState(25);
  const [time, setTime] = useState(`${defaultTimer} : 00`);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [timerStatus, setTimerStatus] = useState("stopped");
  const [toggleAdjustment, setToggleAdjustment] = useState(false);
  const [toggleMusic, setToggleMusic] = useState(false);
  const [task, setTask] = useState("Focus");
  const { customcolor, bgcolor500 } = useColorTheme();

  const handleTimer = (value) => {
    if (value == "started") {
      let remainingSeconds = localStorage.getItem("secondsRemaining");
      if (remainingSeconds) {
        localStorage.setItem(
          "pomodoroTimer",
          dayjs().add(remainingSeconds, "second")
        );
        setTimerStatus("started");
        localStorage.removeItem("secondsRemaining");
      } else {
        localStorage.setItem(
          "pomodoroTimer",
          dayjs().add(defaultTimer, "minute")
        );
        localStorage.setItem("maxSeconds", defaultTimer * 60);
        setTimerStatus("started");
      }
    }

    if (value == "paused") {
      localStorage.removeItem("pomodoroTimer");
      localStorage.setItem("secondsRemaining", secondsRemaining);
      setTimerStatus("paused");
    }
    if (value == "stopped") {
      localStorage.removeItem("pomodoroTimer");
      localStorage.removeItem("maxSeconds");
      localStorage.removeItem("secondsRemaining");
      setTimerStatus("stopped");
    }
  };

  useEffect(() => {
    let pomodoroTimer = localStorage.getItem("pomodoroTimer");
    let remainingSeconds = localStorage.getItem("secondsRemaining");
    let maxSeconds = localStorage.getItem("maxSeconds");
    let defaultTime = localStorage.getItem("defaultTimer");
    let totalSeconds = parseInt(dayjs(pomodoroTimer).diff(dayjs()) / 1000) + 1;

    if (totalSeconds > 1) {
      setTimerStatus("started");
      if (totalSeconds > 1) {
        const intervalId = setInterval(() => {
          totalSeconds -= 1;
          setSecondsRemaining(totalSeconds);

          let minutes = Math.floor(totalSeconds / 60);
          let seconds = totalSeconds % 60;
          let showMinute =
            String(minutes).length == 1 ? "0" + minutes : minutes;
          let showSecond =
            String(seconds).length == 1 ? "0" + seconds : seconds;
          let percent = 100 - (totalSeconds / maxSeconds) * 100;
          setPercentage(percent);
          setTime(`${showMinute} : ${showSecond}`);

          // If timer is up, clear the interval and reset everything
          if (totalSeconds < 1) {
            TimerSuccess.play();
            setPercentage(0);
            setTimerStatus("stopped");
            setTime(`${defaultTimer} : 00`);
            clearInterval(intervalId);
            if (window.confirm("Timer completed!")) {
              TimerSuccess.pause();
            }
          }
        }, 1000);

        // Clear Interval after every second as new interval is created.
        return () => clearInterval(intervalId);
      }
    } else if (remainingSeconds) {
      let minutes = Math.floor(remainingSeconds / 60);
      let seconds = remainingSeconds % 60;
      let showMinute = String(minutes).length == 1 ? "0" + minutes : minutes;
      let showSecond = String(seconds).length == 1 ? "0" + seconds : seconds;
      let percent = 100 - (remainingSeconds / maxSeconds) * 100;
      setTime(`${showMinute} : ${showSecond}`);
      setPercentage(percent);
      setTimerStatus("paused");
    } else {
      localStorage.removeItem("pomodoroTimer");
      localStorage.removeItem("maxSeconds");
      setPercentage(0);
      setTimerStatus("stopped");
      if (defaultTime) {
        setDefaultTimer(defaultTime);
        setTime(`${defaultTime} : 00`);
      }
    }
  }, [timerStatus]);

  return (
    <div>
      <div className="flex justify-end m-5">
        {timerStatus == "stopped" ? (
          <>
            <AdjustmentIcon
              className="w-8 h-8"
              onClick={() => {
                setToggleAdjustment(!toggleAdjustment);
                setToggleMusic(false);
              }}
            />
          </>
        ) : (
          <div className="w-8 h-8"></div>
        )}
      </div>

      {toggleAdjustment && (
        <Suspense fallback={<Shimmer />}>
          <Adjustment
            {...{
              defaultTimer,
              task,
              setDefaultTimer,
              setTime,
              setToggleAdjustment,
              setTask,
            }}
          />
        </Suspense>
      )}

      {!toggleAdjustment && !toggleMusic && (
        <div>
          <h1 className="text-center font-madimi m-5 text-2xl">{task}</h1>
          <div className="w-5/6 m-auto">
            <Circle
              value={percentage}
              text={time}
              styles={buildStyles({
                textColor: customcolor,
                pathColor: customcolor,
                trailColor: "rgb(71 85 105)",
              })}
              strokeWidth={2}
            />
          </div>

          <div className="text-center mt-5">
            {timerStatus != "started" && (
              <button
                className={`my-3 py-2 px-10 ${bgcolor500} text-black text-lg rounded-full items-center`}
                onClick={() => handleTimer("started")}
              >
                START
              </button>
            )}

            {timerStatus == "started" && (
              <button
                className={`my-3 py-2 px-10 ${bgcolor500} text-black text-lg rounded-full items-center`}
                onClick={() => handleTimer("paused")}
              >
                PAUSE
              </button>
            )}

            {timerStatus != "stopped" && (
              <button
                className={`my-3 py-2 px-10 ${bgcolor500} text-black text-lg rounded-full items-center ml-5`}
                onClick={() => handleTimer("stopped")}
              >
                STOP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
