import { useColorTheme } from "../../hooks/useColorTheme";

const ToggleButton = ({ toggle, setToggle, name }) => {
  const { checkedcolor } = useColorTheme();
  const userVibrate = localStorage.getItem("userVibrate");

  const toggleChange = () => {
    if (Boolean(userVibrate)) {
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
          className={`w-11 h-6  rounded-full peer bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 ${checkedcolor}`}
        ></div>
        <span className="ms-2 text-sm font-medium  text-gray-300">{name}</span>
      </label>
    </div>
  );
};

export default ToggleButton;
