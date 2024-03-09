import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Avatar from "./Avatar";
import UserDetails from "./UserDetails";
import ProgressBar from "./ProgressBar";
import { useColorTheme } from "../../hooks/useColorTheme";

const GlobalHeader = () => {
  const { state } = useContext(HabitechContext);
  const { bgcolor400 } = useColorTheme();
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
          color="bg-red-700"
        />
        <ProgressBar
          objective="Experience"
          value={state.user.exp % 100}
          color={bgcolor400}
        />
      </div>
    </div>
  );
};

export default GlobalHeader;
