import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
};

const HowItWorks = () => {
  const [steps, setSteps] = useState(null);

  useEffect(() => {
  console.log("Fetching steps...");

  fetch(`${import.meta.env.VITE_API_URL}/steps`)
    .then((res) => {
      console.log("Response status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("STEPS DATA RECEIVED:", data);
      setSteps(data);
    })
    .catch((err) => {
      console.error("FETCH ERROR:", err);
    });
}, []);

  if (!steps) {
    return (
      <section className="py-16 text-center">
        <p className="text-gray-500">Loading steps...</p>
      </section>
    );
  }

  return (
    <motion.section
      className="py-16 text-center"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-10">How It Works</h2>

      <div className="relative border-l-2 border-gray-300 dark:border-gray-600 ml-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            variants={item}
            className="relative mb-10 pl-10 group"
          >
            <div className="absolute left-[-10px] top-2 w-4 h-4 rounded-full bg-pink-500 group-hover:scale-125 transition" />

            <div className="absolute left-[-38px] top-1 text-sm font-bold text-gray-500">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="text-2xl mb-1">{step.icon}</div>

            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-gray-500">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;