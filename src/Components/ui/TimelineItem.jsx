import { motion } from "framer-motion";

export default function TimelineItem({ title, desc }) {
  return (
    <motion.div
      className="relative pl-10 mb-10 group"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* DOT */}
      <motion.div
        className="absolute left-[-10px] top-1.5 w-4 h-4 rounded-full bg-blue-500"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.4, x: 6 },
        }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      {/* TITLE */}
      <motion.h3
        className="font-semibold text-lg"
        variants={{
          rest: { opacity: 1, x: 0 },
          hover: { opacity: 1, x: 0 },
        }}
      >
        {title}
      </motion.h3>

      {/* DESCRIPTION (THE EFFECT YOU WANT) */}
      <motion.p
        className="text-gray-500"
        variants={{
          rest: {
            opacity: 0,
            x: -20, // starts slightly left
          },
          hover: {
            opacity: 1,
            x: 0, // slides into place
          },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {desc}
      </motion.p>
    </motion.div>
  );
}