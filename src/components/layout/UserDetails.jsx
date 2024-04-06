import { useContext } from "react";
import { Link } from "react-router-dom";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import CoinIcon from "../icons/CoinIcon";
import LevelIcon from "../icons/LevelIcon";

const UserDetails = () => {
  const { state, appLoading } = useContext(HabitechContext);

  if (appLoading) return <Shimmer />;
  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <h2 className="text-3xl">{state.user.name}</h2>
        <div id="tour-info">
          <Link to="/info">
            <h1>Hello</h1>
          </Link>
        </div>
      </div>

      <div className="flex">
        <div className="flex text-xl" id="tour-level">
          <LevelIcon />
          <h1 className="mr-5">{parseInt(state.user.exp / 100)}</h1>
        </div>

        <div className="flex text-xl" id="tour-coins">
          <CoinIcon />
          <h1 className="ml-1">{state.user.coins}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
