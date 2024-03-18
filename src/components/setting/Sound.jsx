import { useCallback, useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { API_URL } from "../../constants";
import { useSound } from "../../hooks/useSound";
import { useColorTheme } from "../../hooks/useColorTheme";
import axios from "axios";
import ToggleButton from "../common/ToggleButton";
import CircleIcon from "../icons/CircleIcon";
import CircleTickedIcon from "../icons/CircleTickedIcon";

const soundData = [
  "Twinkle",
  "Retro",
  "Archive",
  "Excite",
  "Shallow",
  "Ping",
  "Pop",
  "Progress",
  "Tap",
  "Success",
  "Tuck",
  "Answer",
  "Notify",
  "Click",
];

const Sound = () => {
  const [enableSound, setEnableSound] = useState(false);
  const [currentSound, setCurrentSound] = useState("Retro");
  const [volume, setVolume] = useState(0);
  const { state, dispatch } = useContext(HabitechContext);
  const { checkboxcolor } = useColorTheme();

  const updateEnableSound = (value) => {
    setEnableSound(value);
    // API Call to set enable or disable sound setting
    axios
      .put(API_URL, {
        ...state,
        user: {
          ...state.user,
          sound: {
            ...state.user.sound,
            enable: value,
          },
        },
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            user: res?.data?.user,
          },
        });
      });
  };

  const changeSound = (value) => {
    if (value == currentSound) {
      return;
    }
    setCurrentSound(value);
    const getSound = useSound(value);
    getSound.volume = state.user.sound.volume;
    getSound.play();
    // API Call to set current sound
    axios
      .put(API_URL, {
        ...state,
        user: {
          ...state.user,
          sound: {
            ...state.user.sound,
            currentSound: value,
          },
        },
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            user: res?.data?.user,
          },
        });
      });
  };
  var timer;
  // Debounce to reduce API Calls
  const updateSound = useCallback(
    (e) => {
      if (state.user.vibrate) {
        window.navigator.vibrate([5, 200, 20]);
      }
      clearTimeout(timer);
      setVolume(e.target.value);
      timer = setTimeout(() => {
        // API Call to set volume
        axios
          .put(API_URL, {
            ...state,
            user: {
              ...state.user,
              sound: {
                ...state.user.sound,
                currentSound: currentSound,
                volume: parseFloat(e.target.value),
              },
            },
          })
          .then((res) => {
            dispatch({
              type: "FETCH_DATA",
              payload: {
                user: res?.data?.user,
              },
            });
          });
      }, 700);
    },
    [currentSound]
  );

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    } else {
      setEnableSound(state.user.sound.enable);
      setCurrentSound(state.user.sound.currentSound);
      setVolume(state.user.sound.volume);
    }
  }, [state]);
  return (
    <div className="mt-3">
      <div className="flex justify-between">
        <h1>Enable Sound</h1>
        <ToggleButton
          toggle={enableSound}
          setToggle={updateEnableSound}
          name=""
        />
      </div>

      {enableSound && (
        <>
          <div className="mt-2 p-2">
            <label htmlFor="steps-range">Sound Volume: {volume * 100}%</label>
            <input
              id="steps-range"
              type="range"
              min="0"
              max="1"
              value={volume}
              step="0.1"
              className={`w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 ${checkboxcolor}`}
              onChange={(e) => updateSound(e)}
            />
          </div>

          <div className="mt-3 p-2">
            {soundData.map((sound) => {
              return (
                <div className="flex mt-1" key={sound}>
                  {sound == currentSound ? (
                    <CircleTickedIcon className="w-6 h-6" />
                  ) : (
                    <CircleIcon
                      className="w-6 h-6"
                      onClick={() => changeSound(sound)}
                    />
                  )}
                  <h1 className="ml-2" onClick={() => changeSound(sound)}>
                    {sound}
                  </h1>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sound;
