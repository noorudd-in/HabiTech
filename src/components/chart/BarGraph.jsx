import {
  ComposedChart,
  Line,
  XAxis,
  Bar,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useColorTheme } from "../../hooks/useColorTheme";

const BarGraph = ({ data, xlabel, bar1 }) => {
  const { customcolor } = useColorTheme();
  return (
    <>
      <ResponsiveContainer width={"100%"} height={300}>
        <ComposedChart data={data}>
          <XAxis dataKey={xlabel} stroke={customcolor} />
          <Tooltip />
          <Bar
            dataKey={bar1}
            barSize={20}
            stroke={customcolor}
            fill={customcolor}
          />
          <Line type="monotone" dataKey={bar1} stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarGraph;
