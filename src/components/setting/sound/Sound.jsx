import { useCallback, useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../../contexts/HabitechContext";
import { useColorTheme } from "../../../hooks/useColorTheme";
import ToggleButton from "../../common/ToggleButton";
import CircleIcon from "../../icons/CircleIcon";
import CircleTickedIcon from "../../icons/CircleTickedIcon";
import { CLOUD_AUDIO_PATH } from "../../../constants";
//purchase_rtnov1
const soundData = [
  "twinkle_qcm4wr",
  "retro_sh5xox",
  "archive_lvbkz7",
  "excite_oqn27r",
  "shallow_kamgsy",
  "ping_mk1xnt",
  "pop_ox79jn",
  "progress_gowxzp",
  "tap_hvj326",
  "success_koztas",
  "tuck_rhsaet",
  "answer_fsvrij",
  "notify_hm57yq",
  "click_fxgbeg",
];

const Sound = () => {
  const [enableSound, setEnableSound] = useState(false);
  const [currentSound, setCurrentSound] = useState("archive_lvbkz7");
  const [volume, setVolume] = useState(0.5);
  const { state } = useContext(HabitechContext);
  const { checkboxcolor } = useColorTheme();

  const updateEnableSound = (value) => {
    setEnableSound(value);
    if (value) {
      localStorage.setItem("userSound", value);
      localStorage.setItem("userCurrentSound", "archive_lvbkz7");
      localStorage.setItem("userCurrentVolume", 0.5);
    } else {
      localStorage.removeItem("userSound");
      localStorage.removeItem("userCurrentSound");
      localStorage.removeItem("userCurrentVolume");
    }
  };

  const changeSound = (value) => {
    if (value == currentSound) {
      return;
    }
    setCurrentSound(value);
    const sound = new Audio(`${CLOUD_AUDIO_PATH + value}.mp3`);
    sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
    sound.play();
    localStorage.setItem("userCurrentSound", value);
  };
  var timer;
  // Debounce to reduce operations
  const updateSound = useCallback(
    (e) => {
      if (localStorage.getItem("userVibrate") == "true") {
        window.navigator.vibrate([5, 200, 20]);
      }
      clearTimeout(timer);
      setVolume(e.target.value);
      timer = setTimeout(() => {
        localStorage.setItem("userCurrentVolume", e.target.value);
        const sound = new Audio(`${CLOUD_AUDIO_PATH + currentSound}.mp3`);
        sound.volume = e.target.value;
        sound.play();
      }, 700);
    },
    [currentSound]
  );

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    } else if (localStorage.getItem("userSound") == "true") {
      setEnableSound(localStorage.getItem("userSound") == "true");
      setCurrentSound(localStorage.getItem("userCurrentSound"));
      setVolume(parseFloat(localStorage.getItem("userCurrentVolume")));
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
              className={`w-full h-2 rounded-lg cursor-pointer bg-gray-700 ${checkboxcolor}`}
              onChange={(e) => updateSound(e)}
            />
          </div>

          <div className="mt-3 p-2">
            {soundData.map((sound) => {
              let soundName = sound.split("_");
              soundName = soundName[0];
              soundName = soundName[0].toUpperCase() + soundName.slice(1);
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
                    {soundName}
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
