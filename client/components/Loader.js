import { motion, AnimatePresence } from 'framer-motion';

const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1
      }
    },
    end: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const loadingCircleVariants = {
    start: {
      y: "50%"
    },
    end: {
      y: "150%"
    }
  };
  
  const loadingCircleTransition = {
    duration: 0.5,
    repeat: Infinity,
    ease: "easeInOut"
  };

export default function Loader () {
    return (
        <motion.div className="absolute top-[80%] left-[50%] flex justify-around w-16 h-16"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span className="block rounded-full w-4 h-4 bg-[#F14B1C]"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span className="block rounded-full w-4 h-4 bg-[#F14B1C]"
        
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span className="block rounded-full w-4 h-4 bg-[#F14B1C]"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    )
}