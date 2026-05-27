import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const MonthlyLineChart = ({ data }) => (
  <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="count" stroke="#22c55e" />
  </LineChart>
);

export default MonthlyLineChart;
