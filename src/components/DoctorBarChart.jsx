import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

const DoctorBarChart = ({ data }) => {
  const navigate = useNavigate();

  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="doctor" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="count"
        fill="#2563eb"
        onClick={(e) => navigate(`/admin/doctor/${e.doctor}`)}
      />
    </BarChart>
  );
};

export default DoctorBarChart;
