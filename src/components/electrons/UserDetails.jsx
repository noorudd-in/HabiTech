import { useContext } from "react";
import { Link } from "react-router-dom";
import { HabitechContext } from "../../contexts/HabitechContext";
import settingIcon from "../../../assets/settings.svg";

const UserDetails = () => {
  const { state } = useContext(HabitechContext);
  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <h2 className="text-3xl">{state.user.name}</h2>
        <Link to="/setting">
          <img src={settingIcon} alt="Settings Icon" className="w-9" />
        </Link>
      </div>
      <h2>Level: {state.user.exp % 1000}</h2>
    </div>
  );
};

export default UserDetails;
