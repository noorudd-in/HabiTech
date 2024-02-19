import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";

const Avatar = () => {
  const { state } = useContext(HabitechContext);
  return (
    <>
      <img
        src={state.user?.avatarURL}
        alt="Avatar Image"
        className="rounded-md"
      />
    </>
  );
};

export default Avatar;
