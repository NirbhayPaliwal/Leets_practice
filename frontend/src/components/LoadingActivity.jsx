import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="h-[50vh] w-[80vw] flex items-center justify-center relative overflow-hidden">
      {/* Simple Loading Spinner */}
      <motion.div
        className="w-10 h-10 border-2 border-t-2 border-t-darkest border-bright rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
