import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import CalenderIcon from "../icons/CalenderIcon";
import TimerIcon from "../icons/TimerIcon";
import SettingIcon from "../icons/SettingIcon";
import CreateIcon from "../icons/CreateIcon";

const GlobalFooter = () => {
  const { state } = useContext(HabitechContext);
  const navigate = useNavigate();
  const currentURL = window.location.pathname;

  // Set Haptic Feedback
  const setVibrate = () => {
    if (state.user.vibrate) {
      window.navigator.vibrate(5);
    }
  };
  return (
    <div className="fixed z-50 w-10/12 h-16 max-w-lg -translate-x-1/2 border rounded-full bottom-4 left-1/2 bg-gray-700 border-gray-600">
      <div
        className="grid h-full max-w-lg grid-cols-5 mx-auto"
        onClick={setVibrate}
      >
        <HomeIcon currentURL={currentURL} navigate={navigate} />
        <CalenderIcon currentURL={currentURL} navigate={navigate} />

        <CreateIcon navigate={navigate} currentURL={currentURL} />

        <TimerIcon currentURL={currentURL} navigate={navigate} />
        <SettingIcon currentURL={currentURL} navigate={navigate} />
      </div>
    </div>
  );
};

export default GlobalFooter;
