import { Line } from "rc-progress";

const ProgressBar = ({ color, objective, value }) => {
  return (
    <div>
      <Line percent={value} strokeWidth={3} strokeColor={color} />
      <div className="flex justify-between text-xs">
        <h1>{objective}</h1>
        <h1>{value}%</h1>
      </div>
    </div>
  );
};

export default ProgressBar;
