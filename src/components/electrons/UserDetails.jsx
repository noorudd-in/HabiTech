import { useContext } from "react";
import { Link } from "react-router-dom";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import settingIcon from "../../../assets/settings.svg";
import CoinIcon from "../icons/CoinIcon";
import BadgeIcon from "../icons/BadgeIcon";

const UserDetails = () => {
  const { state, appLoading } = useContext(HabitechContext);

  if (appLoading) return <Shimmer />;
  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <h2 className="text-3xl">{state.user.name}</h2>
        <Link to="/setting">
          <img src={settingIcon} alt="Settings Icon" className="w-9" />
        </Link>
      </div>

      <div className="flex">
        <div className="flex text-xl">
          <BadgeIcon />
          <h1 className="mr-5">{parseInt(state.user.exp / 100)}</h1>
        </div>

        <div className="flex text-xl">
          <CoinIcon />
          <h1 className="ml-1">{state.user.coins}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
