import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useColorTheme } from "../../hooks/useColorTheme";

const AreaGraph = ({ data }) => {
  const { customcolor } = useColorTheme();
  return (
    <ResponsiveContainer width={"100%"} height={150}>
      <AreaChart data={data}>
        <Area
          type="monotone"
          dataKey="count"
          stroke={customcolor}
          fill={customcolor}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaGraph;
