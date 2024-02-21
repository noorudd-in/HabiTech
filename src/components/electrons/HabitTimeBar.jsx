const HabitTimeBar = ({ value, status }) => {
  return (
    <div className="w-full bg-gray-200 h-2 dark:bg-gray-700 mt-3 -mb-3 rounded-t">
      <div
        className={`${status == 1 && "bg-emerald-500"} ${
          status == -1 && "bg-red-500"
        }  h-2 rounded-tl`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default HabitTimeBar;
