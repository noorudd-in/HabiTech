import { useEffect, useContext } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { Link } from "react-router-dom";
import GlobalHeader from "../components/layout/GlobalHeader";
import ActivityFeedIcon from "../components/icons/ActivityFeedIcon";
import ThemeIcon from "../components/icons/ThemeIcon";
import AvatarIcon from "../components/icons/AvatarIcon";
import BadgeIcon from "../components/icons/BadgeIcon";
import SoundAndVibrationIcon from "../components/icons/SoundAndVibrationIcon";
import LockIcon from "../components/icons/LockIcon";
import aboutPNG from "../../assets/about.png";
import linkedInPNG from "../../assets/linkedin.png";
import githubPNG from "../../assets/github.png";
import TermsAndConditionIcon from "../components/icons/TermsAndConditionIcon";
import PrivacyPolicy from "../components/icons/PrivacyPolicyIcon";

const Settings = () => {
  const { state } = useContext(HabitechContext);

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
  }, []);
  return (
    <div>
      <GlobalHeader />
      <div className="m-2 mt p-2 bg-gray-700 rounded">
        <Link to="/activity">
          <div className="flex px-1 text-lg my-2">
            <ActivityFeedIcon className="w-6 h-7" />
            <h1 className="ml-2">Activity Feed</h1>
          </div>
        </Link>

        <Link to="/appearance">
          <div className="flex px-1 text-lg my-2">
            <ThemeIcon className="w-6 h-7" />
            <h1 className="ml-2">Appearance</h1>
          </div>
        </Link>

        <Link to="/avatar">
          <div className="flex px-1 text-lg my-2">
            <AvatarIcon className="w-6 h-7" />
            <h1 className="ml-2">Avatar</h1>
          </div>
        </Link>

        <Link to="/reward">
          <div className="flex px-1 text-lg my-2">
            <BadgeIcon className="w-6 h-7" />
            <h1 className="ml-2">Badge</h1>
          </div>
        </Link>

        <Link to="/sound">
          <div className="flex px-1 text-lg my-2">
            <SoundAndVibrationIcon className="w-6 h-7" />
            <h1 className="ml-2">Sound & Vibration</h1>
          </div>
        </Link>

        <Link to="/sound">
          <div className="flex px-1 text-lg my-2">
            <LockIcon className="w-6 h-7" />
            <h1 className="ml-2">Lock</h1>
          </div>
        </Link>
      </div>

      <div className="m-2 mt p-2  bg-gray-700 rounded">
        <Link to="/about">
          <div className="flex px-1 text-lg my-2">
            <div className="w-6 h-6">
              <img src={aboutPNG} alt="About HabiTech" />
            </div>
            <h1 className="ml-2">About HabiTech</h1>
          </div>
        </Link>

        <Link to="https://linkedin.com/in/nooruddin-shaikh" target="_blank">
          <div className="flex px-1 text-lg my-2">
            <div className="w-6 h-6">
              <img src={linkedInPNG} alt="About HabiTech" />
            </div>
            <h1 className="ml-2">Follow me on LinkedIn</h1>
          </div>
        </Link>

        <Link to="https://github.com/noorudd-in/habitech" target="_blank">
          <div className="flex px-1 text-lg my-2">
            <div className="w-6 h-6">
              <img src={githubPNG} alt="About HabiTech" />
            </div>
            <h1 className="ml-2">Source Code</h1>
          </div>
        </Link>
      </div>

      <div className="m-2 mt p-2 bg-gray-700 rounded">
        <Link to="/terms">
          <div className="flex px-1 text-lg my-2">
            <TermsAndConditionIcon className="w-6 h-7" />
            <h1 className="ml-2">Terms & Conditions</h1>
          </div>
        </Link>

        <Link to="/privacy">
          <div className="flex px-1 text-lg my-2">
            <PrivacyPolicy className="w-6 h-7" />
            <h1 className="ml-2">Privacy Policy</h1>
          </div>
        </Link>
      </div>

      <div>
        <h1 className="mt-1 mb-5 text-center italic">Version: 9.12</h1>
      </div>
    </div>
  );
};

export default Settings;
