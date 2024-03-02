import { useNavigate } from "react-router-dom";
import { useColorTheme } from "../hooks/useColorTheme";

const CreatePage = () => {
  const navigate = useNavigate();
  const { bgcolor500, lighttext } = useColorTheme();
  function redirectPage(url) {
    navigate(url);
  }
  return (
    <>
      <div className="mt-40">
        <div className="text-center">
          <button
            className={`p-2 m-2 ${bgcolor500} ${lighttext} text-2xl rounded-lg`}
            onClick={() => redirectPage("/create/habit")}
          >
            <h1 className="ml-2 mr-1">Create Habit</h1>
          </button>
        </div>
        <div className="text-center">
          <button
            className={`p-2 m-2 ${bgcolor500} ${lighttext} text-2xl rounded-lg`}
            onClick={() => redirectPage("/create/goal")}
          >
            <h1 className="ml-2 mr-1">Create Goal</h1>
          </button>
        </div>

        <div className="text-center">
          <button
            className={`p-2 m-2 ${bgcolor500} ${lighttext} text-2xl rounded-lg`}
            onClick={() => redirectPage("/create/tag")}
          >
            <h1 className="ml-2 mr-1">Create Tag</h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
