import { motion } from "framer-motion";
import { useTheme } from "@/utils/ThemeContext";

const buttonVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

export function ThemeCycleButton() {
  const { cycle, label, icon } = useTheme();

  return (
    <motion.button
      type="button"
      aria-label={`Switch to ${label === "dark" ? "light" : "dark"} mode`}
      onClick={cycle}
      // same “page” motion
      variants={buttonVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      // extra interaction polish
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-full hover:bg-muted flex items-center justify-center border"
    >
      {icon}
    </motion.button>
  );
}