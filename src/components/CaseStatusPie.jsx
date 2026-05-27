import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

const CaseStatusPie = ({ data }) => {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {chartData.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CaseStatusPie;
