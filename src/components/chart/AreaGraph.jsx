import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useColorTheme } from "../../hooks/useColorTheme";

const AreaGraph = ({ data, xkey, modal, height }) => {
  const { customcolor } = useColorTheme();

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i[xkey]));
    const dataMin = Math.min(...data.map((i) => i[xkey]));
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <ResponsiveContainer width={"100%"} height={height}>
      <AreaChart data={data}>
        {!modal && <Tooltip />}
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor={customcolor} stopOpacity={1} />
            <stop offset={off} stopColor="#ef4444" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={xkey}
          stroke={customcolor}
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaGraph;
