import { useContext, useEffect } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { useNavigate } from "react-router-dom";

const CommingSoon = () => {
  const { state } = useContext(HabitechContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user.name == undefined) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1 className="text-center mt-20 text-5xl">Comming Soon!</h1>
      <p className="text-center italic">Stay tuned and check back later.</p>
    </div>
  );
};

export default CommingSoon;
