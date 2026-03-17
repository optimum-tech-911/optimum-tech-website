import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, -20]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        y,
        rotateX,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
