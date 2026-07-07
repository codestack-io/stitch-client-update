import { useEffect, useState } from "react";
import Counter from "../ui/Counter";
import { FadeUp } from "../ui/Motion";

const StatsSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(stats);

  if (!stats) return null; // or loading UI

  return (
    <FadeUp>
      <section className="py-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <Counter end={stats.products} label="Products" />
        <Counter end={stats.users} label="Users" />
        <Counter end={stats.orders} label="Orders" />
        <Counter end={stats.payments} label="Payments" />
      </section>
    </FadeUp>
  );
};

export default StatsSection;