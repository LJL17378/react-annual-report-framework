import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './Summary.module.scss';

interface SummaryProps {
  pageIndex: number;
}

const Summary: React.FC<SummaryProps> = ({ pageIndex }) => {
  const { activeIndex, userData } = useApp();
  const isActive = activeIndex === pageIndex;

  const contentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.summaryPage}>
      <motion.div
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        variants={contentVariants}
      >
        <motion.h2 className={styles.title} variants={textVariants}>
          2024 年度总结
        </motion.h2>

        <motion.div className={styles.statsGrid} variants={contentVariants}>
          <motion.div className={styles.statCard} variants={itemVariants}>
            <Heart className={styles.icon} size={40} />
            <div className={styles.number}>{userData?.friendsCount || 256}</div>
            <div className={styles.label}>新认识的朋友</div>
          </motion.div>

          <motion.div className={styles.statCard} variants={itemVariants}>
            <Star className={styles.icon} size={40} />
            <div className={styles.number}>{userData?.totalDays || 365}</div>
            <div className={styles.label}>陪伴的日子</div>
          </motion.div>

          <motion.div className={styles.statCard} variants={itemVariants}>
            <TrendingUp className={styles.icon} size={40} />
            <div className={styles.number}>100%</div>
            <div className={styles.label}>成长指数</div>
          </motion.div>
        </motion.div>

        <motion.p className={styles.message} variants={textVariants}>
          感谢有你，期待下一年更精彩！
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Summary;
