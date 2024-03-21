import { useContext, useEffect, useState } from "react";
import ToggleButton from "../common/ToggleButton";
import { HabitechContext } from "../../contexts/HabitechContext";
const Vibration = () => {
  const [vibration, setVibration] = useState("");
  const { state } = useContext(HabitechContext);

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    } else {
      setVibration(localStorage.getItem("userVibrate") == "true");
    }
  }, []);

  const updateVibration = (value) => {
    setVibration(value);
    localStorage.setItem("userVibrate", value);
  };

  return (
    <div className="flex justify-between">
      <h1>Enable Haptic Feedback</h1>
      <ToggleButton toggle={vibration} setToggle={updateVibration} name="" />
    </div>
  );
};

export default Vibration;
