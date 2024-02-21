const ProgressBar = ({ color, objective, value }) => {
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs">
        <h1>{objective}</h1>
        <h1>{value}%</h1>
      </div>
    </div>
  );
};

export default ProgressBar;
