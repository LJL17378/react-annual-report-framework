import React from 'react';
import { motion } from 'framer-motion';
import { Cake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './Birthday.module.scss';

interface BirthdayProps {
  pageIndex: number;
}

const Birthday: React.FC<BirthdayProps> = ({ pageIndex }) => {
  const { activeIndex, userData } = useApp();
  const isActive = activeIndex === pageIndex;

  const contentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const imgVariants = {
    hidden: { y: 100, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.birthdayPage}>
      <motion.div
        className={styles.text}
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        variants={contentVariants}
      >
        <motion.p variants={itemVariants}>在这里，</motion.p>
        <motion.p variants={itemVariants}>
          有 <span className={styles.bold}>{userData?.sameBirthday || 128}</span> 位同学与你一起庆祝生日，
        </motion.p>
        <motion.p variants={itemVariants}>或许你认识他们。</motion.p>
      </motion.div>

      <motion.div
        className={styles.imageContainer}
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        variants={contentVariants}
      >
        <motion.div variants={imgVariants}>
          <Cake size={120} className={styles.icon} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Birthday;
