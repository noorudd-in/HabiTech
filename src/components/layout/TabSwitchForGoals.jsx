import { useColorTheme } from "../../hooks/useColorTheme";

const TabSwitchForGoals = ({ showActive, setShowActive }) => {
  const { bgcolor500, border400 } = useColorTheme();
  return (
    <div className="inline-flex rounded-md">
      <button
        type="button"
        onClick={() => setShowActive(true)}
        className={`px-2 py-1 text-sm font-medium rounded-s-lg border  ${
          showActive
            ? bgcolor500 + " " + border400 + " " + "text-gray-900"
            : "border-gray-700 bg-gray-800 text-white"
        }`}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => setShowActive(false)}
        className={`px-2 py-1 text-sm font-medium rounded-e-lg border ${
          showActive
            ? "border-gray-700 bg-gray-800 text-white"
            : bgcolor500 + " " + border400 + " " + "text-gray-900"
        }`}
      >
        Inactive
      </button>
    </div>
  );
};

export default TabSwitchForGoals;
