const HabitTimeBar = ({ value, status }) => {
  return (
    <div className="w-full bg-gray-200 h-2 dark:bg-gray-700 mt-3 -mb-3 rounded-t">
      <div
        className={`${status == 1 && "bg-green-600"} ${
          status == -1 && "bg-red-700"
        }  h-2 rounded-t`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default HabitTimeBar;
