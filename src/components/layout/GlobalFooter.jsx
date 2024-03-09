import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import CalenderIcon from "../icons/CalenderIcon";
import TimerIcon from "../icons/TimerIcon";
import SettingIcon from "../icons/SettingIcon";
import CreateIcon from "../icons/CreateIcon";

const GlobalFooter = () => {
  const navigate = useNavigate();
  const currentURL = window.location.pathname;
  return (
    <div className="fixed z-50 w-10/12 h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
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
