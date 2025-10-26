import { motion } from "framer-motion";


function InitialAnimation({children, time=.5, Y=-35}) {
   return (
    <motion.div
      initial={{ opacity: 0, y: Y }}    
      animate={{ opacity: 1, y: 0 }}      
      transition={{ duration: time, ease:"easeInOut" }}
      className="flex flex-col gap-y-[2rem]"
    >
      {children}
    </motion.div>
  );
}

export default InitialAnimation
