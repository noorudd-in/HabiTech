import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";

const Activity = () => {
  const { state } = useContext(HabitechContext);
  return (
    <h1 className="text-center italic">Last Activity: {state.lastEdited}</h1>
  );
};

export default Activity;
