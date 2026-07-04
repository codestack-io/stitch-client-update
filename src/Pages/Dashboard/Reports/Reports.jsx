import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#A855F7"];

const Reports = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const data = [
    {
      name: "Total Orders",
      value: stats.orders || 0,
    },
    {
      name: "Approved",
      value: stats.approvedOrders || 0,
    },
    {
      name: "Pending",
      value: stats.pendingOrders || 0,
    },
    {
      name: "Users",
      value: stats.users || 0,
    },
  ];

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Reports Dashboard
      </h1>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-5 mb-10">

        <div className="card bg-blue-100 shadow">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold">
              Total Orders
            </h2>
            <p className="text-4xl font-bold">
              {stats.orders}
            </p>
          </div>
        </div>

        <div className="card bg-green-100 shadow">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold">
              Approved
            </h2>
            <p className="text-4xl font-bold">
              {stats.approvedOrders}
            </p>
          </div>
        </div>

        <div className="card bg-yellow-100 shadow">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold">
              Pending
            </h2>
            <p className="text-4xl font-bold">
              {stats.pendingOrders}
            </p>
          </div>
        </div>

        <div className="card bg-purple-100 shadow">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold">
              Users
            </h2>
            <p className="text-4xl font-bold">
              {stats.users}
            </p>
          </div>
        </div>

      </div>

      {/* Chart */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center mb-6">
          Orders Summary
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={140}
              label
              isAnimationActive={true}
              animationDuration={1800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Reports;