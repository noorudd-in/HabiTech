const ToggleButton = ({ showToggle, setShowToggle, name }) => {
  const attrs = showToggle ? "checked" : "";
  return (
    <div>
      <label className="relative inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          defaultChecked
          onChange={() => setShowToggle(!showToggle)}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
        <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {name}
        </span>
      </label>
    </div>
  );
};

export default ToggleButton;
