import { motion } from "framer-motion";

export default function Overview() {
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
}