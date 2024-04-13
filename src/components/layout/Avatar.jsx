import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { AVATAR_DATA } from "../../constants";

const Avatar = () => {
  const { state } = useContext(HabitechContext);
  return (
    <>
      <img
        src={AVATAR_DATA[state.user?.avatar - 110]?.url}
        alt="Avatar Image"
        className="rounded-md"
      />
    </>
  );
};

export default Avatar;
