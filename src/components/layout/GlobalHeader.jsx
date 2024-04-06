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
    <div id="tour-header" className="flex m-2">
      <div className="w-[120px] lg:w-[180px]">
        <Avatar />
      </div>
      <div className="w-[65%] ml-2">
        <UserDetails />
        <div id="tour-health">
          <ProgressBar
            objective="Health"
            value={state.user.health}
            color="bg-red-700"
          />
        </div>
        <div id="tour-exp">
          <ProgressBar
            objective="Experience"
            value={state.user.exp % 100}
            color={bgcolor400}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalHeader;
