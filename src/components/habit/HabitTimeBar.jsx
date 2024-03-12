const HabitTimeBar = ({ value, status }) => {
  return (
    <div
      className={`${status == 1 && "bg-green-600"} ${
        status == -1 && "bg-red-700"
      }  h-2 rounded-t`}
      style={{ width: `${value}%` }}
    ></div>
  );
};

export default HabitTimeBar;
