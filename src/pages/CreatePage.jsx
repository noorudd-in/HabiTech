import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useColorTheme } from "../hooks/useColorTheme";
import { HabitechContext } from "../contexts/HabitechContext";
import "../index.css";

const CreatePage = () => {
  const { state } = useContext(HabitechContext);
  const navigate = useNavigate();
  const { gradient } = useColorTheme();
  function redirectPage(url) {
    navigate(url);
  }

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
  });
  return (
    <>
      <div className="my-20">
        <div className="grid grid-rows-4 sm:grid-rows-2 sm:grid-cols-2">
          <div
            className={`col-span-1 m-5 p-5 h-24 rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] ${gradient} cursor-pointer`}
            onClick={() => redirectPage("/create/plan")}
          >
            <h1 className="text-black text-4xl font-semibold">Create Plan</h1>
          </div>
          <div
            className={`col-span-1 m-5 p-5 h-24 rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] ${gradient} cursor-pointer`}
            onClick={() => redirectPage("/create/habit")}
          >
            <h1 className="text-black text-4xl font-semibold">Create Habit</h1>
          </div>
          <div
            className={`col-span-1 m-5 p-5 h-24 rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] ${gradient} cursor-pointer`}
            onClick={() => redirectPage("/create/goal")}
          >
            <h1 className="text-black text-4xl font-semibold">Create Goal</h1>
          </div>
          <div
            className={`col-span-1 m-5 p-5 h-24 rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] ${gradient} cursor-pointer`}
            onClick={() => redirectPage("/create/tag")}
          >
            <h1 className="text-black text-4xl font-semibold">Create Tag</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
