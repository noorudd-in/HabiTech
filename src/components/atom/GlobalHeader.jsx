import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Avatar from "../electrons/Avatar";
import UserDetails from "../electrons/UserDetails";
import ProgressBar from "../electrons/ProgressBar";

const GlobalHeader = () => {
  const { state } = useContext(HabitechContext);
  return (
    <div className="flex m-2">
      <div className="w-[120px] lg:w-[180px]">
        <Avatar />
      </div>
      <div className="w-[65%] ml-2">
        <UserDetails />
        <ProgressBar
          objective="Health"
          value={state.user.health}
          color="#e63946"
        />
        <ProgressBar
          objective="Experience"
          value={state.user.exp}
          color="#ffb703"
        />
      </div>
    </div>
  );
};

export default GlobalHeader;
