import { useContext } from "react";
import { useColorTheme } from "../../hooks/useColorTheme";
import { HabitechContext } from "../../contexts/HabitechContext";

const ToggleButton = ({ toggle, setToggle, name }) => {
  const { state } = useContext(HabitechContext);
  const { checkedcolor } = useColorTheme();

  const toggleChange = () => {
    if (state.user.vibrate) {
      window.navigator.vibrate([5, 200, 20]);
    }
    setToggle(!toggle);
  };
  return (
    <div>
      <label className="relative inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          value={toggle}
          checked={toggle ? "checked" : ""}
          className={`sr-only peer`}
          onChange={toggleChange}
        />

        <div
          className={`w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${checkedcolor}`}
        ></div>
        <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {name}
        </span>
      </label>
    </div>
  );
};

export default ToggleButton;
