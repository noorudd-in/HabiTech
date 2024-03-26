import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleBand } from "@visx/scale";
import { useColorTheme } from "../../hooks/useColorTheme";

const data = [
  { x: "A", y: 10 },
  { x: "B", y: 20 },
  { x: "C", y: 15 },
  { x: "D", y: 25 },
];

const width = 400;
const height = 300;

const margin = { top: 10, right: 10, bottom: 20, left: 30 };

const xScale = scaleBand({
  range: [margin.left, width - margin.right],
  domain: data.map((d) => d.x),
  padding: 0.4,
});

const yScale = scaleLinear({
  range: [height - margin.bottom, margin.top],
  domain: [0, Math.max(...data.map((d) => d.y))],
});
const BarChart = () => {
  const { customcolor } = useColorTheme();
  return (
    <div>
      Bar
      <svg width={width} height={height}>
        <Group>
          {data.map((d) => (
            <Bar
              key={d.x}
              x={xScale(d.x)}
              y={yScale(d.y)}
              width={xScale.bandwidth()}
              height={height - margin.bottom - yScale(d.y)}
              fill={customcolor}
            />
          ))}
        </Group>

        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          tickLabelProps={() => ({
            fill: "#7b5e57",
            textAnchor: "middle",
          })}
        />
      </svg>
    </div>
  );
};

export default BarChart;
