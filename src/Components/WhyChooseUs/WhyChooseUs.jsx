import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function WhyChooseUs() {
  return (
    <motion.section
      className="py-16 text-center px-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* FIX: must be motion.h2 with variant */}
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
        variants={item}
      >
        Why Choose Us
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Fast Delivery", "Premium Quality", "Trusted Service"].map(
          (text, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white"
              variants={item}
              whileHover={{ scale: 1.05 }}
            >
              {text}
            </motion.div>
          )
        )}
      </div>
    </motion.section>
  );
}