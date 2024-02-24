import TagIcon from "../components/icons/TagIcon";
import GoalIcon from "./GoalIcon";
import HabitIcon from "./HabitIcon";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();

  function redirectPage(url) {
    navigate(url);
  }
  return (
    <>
      <div className="mt-40">
        <div className="text-center">
          <button
            className="p-2 m-2 bg-amber-500 text-black text-2xl rounded-lg"
            onClick={() => redirectPage("/create/habit")}
          >
            <div className="flex">
              <HabitIcon />
              <h1 className="ml-2 mr-1">Create Habit</h1>
            </div>
          </button>
        </div>
        <div className="text-center">
          <button
            className="p-2 m-2 bg-amber-500 text-black text-2xl rounded-lg"
            onClick={() => redirectPage("/create/goal")}
          >
            <div className="flex">
              <GoalIcon />
              <h1 className="ml-2 mr-1">Create Goal</h1>
            </div>
          </button>
        </div>

        <div className="text-center">
          <button
            className="p-2 m-2 bg-amber-500 text-black text-2xl rounded-lg"
            onClick={() => redirectPage("/create/tag")}
          >
            <div className="flex">
              <TagIcon />
              <h1 className="ml-2 mr-1">Create Tag</h1>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
