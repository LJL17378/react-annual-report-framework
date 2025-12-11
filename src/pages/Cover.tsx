import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './Cover.module.scss';

interface CoverProps {
  pageIndex: number;
}

const Cover: React.FC<CoverProps> = ({ pageIndex }) => {
  const { activeIndex } = useApp();
  const isActive = activeIndex === pageIndex;

  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const subtitleVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const arrowVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1
      }
    }
  };

  return (
    <div className={styles.coverPage}>
      <motion.div
        className={styles.content}
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        variants={contentVariants}
      >
        <motion.h1 className={styles.title} variants={titleVariants}>
          2024
        </motion.h1>
        <motion.h2 className={styles.year} variants={titleVariants}>
          年度总结
        </motion.h2>
        <motion.p className={styles.subtitle} variants={subtitleVariants}>
          感谢这一年的陪伴
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.arrow}
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        variants={arrowVariants}
      >
        <ChevronDown size={32} className={styles.bounce} />
      </motion.div>
    </div>
  );
};

export default Cover;
