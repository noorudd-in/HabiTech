import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import ChartIcon from "../icons/ChartIcon";
import TimerIcon from "../icons/TimerIcon";
import SettingIcon from "../icons/SettingIcon";
import CreateIcon from "../icons/CreateIcon";

const GlobalFooter = () => {
  const navigate = useNavigate();
  const currentURL = window.location.pathname;

  // Set Haptic Feedback
  const setVibrate = () => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
  };
  return (
    <div className="fixed z-50 w-10/12 h-16 max-w-lg -translate-x-1/2 border rounded-full bottom-4 left-1/2 bg-gray-700 border-gray-600">
      <div
        className="grid h-full max-w-lg grid-cols-5 mx-auto"
        onClick={setVibrate}
      >
        <HomeIcon
          currentURL={currentURL}
          navigate={navigate}
          id={"tour-home"}
        />

        <ChartIcon
          currentURL={currentURL}
          navigate={navigate}
          id={"tour-statistics"}
        />

        <CreateIcon
          navigate={navigate}
          currentURL={currentURL}
          id={"tour-create"}
        />

        <TimerIcon
          currentURL={currentURL}
          navigate={navigate}
          id={"tour-timer"}
        />

        <SettingIcon
          currentURL={currentURL}
          navigate={navigate}
          id={"tour-setting"}
        />
      </div>
    </div>
  );
};

export default GlobalFooter;
