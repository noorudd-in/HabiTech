import {
  ComposedChart,
  XAxis,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useColorTheme } from "../../hooks/useColorTheme";

const StackedBarGraph = ({ data, xlabel, bar1, bar2 }) => {
  const { customcolor } = useColorTheme();
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={300}>
        <ComposedChart data={data}>
          <XAxis dataKey={xlabel} stroke="#14b8a6" />
          <Tooltip />
          <Legend />
          <Bar dataKey={bar1} barSize={20} stroke="#14b8a6" fill="#14b8a6" />
          <Bar dataKey={bar2} barSize={20} stroke="#8884d8" fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarGraph;
