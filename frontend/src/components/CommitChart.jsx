import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CommitChart = ({ data }) => {
  return (
    <div className="w-full h-[350px]">
      <h2 className="text-xl font-bold mb-6 text-white">
        Commit Activity
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />

          <Bar
            dataKey="commits"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitChart;