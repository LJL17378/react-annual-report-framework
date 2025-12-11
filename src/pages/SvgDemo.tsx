import React, { useEffect, useId } from "react";
import {
  motion,
  Variants,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import { Zap, Target, TrendingUp, Navigation, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import styles from "./SvgDemo.module.scss";

interface SvgDemoProps {
  pageIndex: number;
}

// --- 核心组件：TracePath (单次触发版) ---
// 新增 isActive 属性，用于控制动画触发时機
const TracePath = ({
  d,
  color,
  isActive,
}: {
  d: string;
  color: string;
  isActive: boolean;
}) => {
  // 1. 生成唯一ID
  const pathId = useId().replace(/:/g, "");
  const uniqueId = `path_${pathId}`;

  const progress = useMotionValue(0);

  // 2. 修正透明度逻辑：
  // 之前是 [0, 1, 1, 0] (最后消失)
  // 现在改为 [0, 1] (最后保持可见)，只在开头淡入
  const opacity = useTransform(progress, [0, 0.1], [0, 1]);

  // 3. 监听 isActive 变化来触发动画
  useEffect(() => {
    if (isActive) {
      // 每次进入页面，先重置为 0
      progress.set(0);

      // 执行一次动画 (没有 repeat)
      const controls = animate(progress, 1, {
        duration: 2.5,
        ease: "easeInOut",
        // 移除了 repeat: Infinity
      });

      return controls.stop;
    }
    // 如果离开页面，可以选择不重置，或者重置。
    // 这里不操作，保持最后的状态，直到下次 isActive 变 true 时上面的 set(0) 会重置它。
  }, [isActive, progress]);

  return (
    <>
      <defs>
        <path id={uniqueId} d={d} />
      </defs>

      {/* 背景轨迹 */}
      <path
        d={d}
        stroke={color}
        strokeWidth="4"
        strokeOpacity="0.15"
        fill="none"
        strokeLinecap="round"
      />

      {/* 动态线条 */}
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength: progress, opacity }}
      />

      {/* 箭头 */}
      <motion.g
        style={{
          // @ts-expect-error：忽略 CSS 变量类型警告
          "--progress": progress,
          offsetPath: `url(#${uniqueId})`,
          offsetDistance: "calc(var(--progress) * 100%)",
          offsetRotate: "auto",
          opacity,
        }}
      >
        <path d="M-6,-6 L8,0 L-6,6 Z" fill={color} transform="scale(1.1)" />
      </motion.g>
    </>
  );
};

const SvgDemo: React.FC<SvgDemoProps> = ({ pageIndex }) => {
  const { activeIndex } = useApp();
  const isActive = activeIndex === pageIndex;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className={styles.svgDemoPage}>
      <motion.div
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        variants={containerVariants}
        className={styles.container}
      >
        <motion.h2 className={styles.title} variants={itemVariants}>
          <Navigation className={styles.titleIcon} size={32} />
          SVG 路径同步
        </motion.h2>

        <div className={styles.demoGrid}>
          {/* 示例 1 */}
          <motion.div className={styles.demoCard} variants={itemVariants}>
            <h3 className={styles.demoTitle}>
              <Target size={20} />
              曲线跟随
            </h3>
            <div className={styles.svgContainer}>
              <svg width="200" height="150" viewBox="0 0 200 150">
                {/* 将 isActive 传给组件 */}
                <TracePath
                  d="M30,120 Q100,20 170,120"
                  color="#4f46e5"
                  isActive={isActive}
                />
              </svg>
            </div>
          </motion.div>

          {/* 示例 2 */}
          <motion.div className={styles.demoCard} variants={itemVariants}>
            <h3 className={styles.demoTitle}>
              <TrendingUp size={20} />
              复杂路径
            </h3>
            <div className={styles.svgContainer}>
              <svg width="200" height="150" viewBox="0 0 200 150">
                <TracePath
                  d="M30,30 C30,30 80,140 120,80 S180,30 180,30"
                  color="#10b981"
                  isActive={isActive}
                />
              </svg>
            </div>
          </motion.div>

          {/* 示例 3 */}
          <motion.div className={styles.demoCard} variants={itemVariants}>
            <h3 className={styles.demoTitle}>
              <Zap size={20} />
              回环路径
            </h3>
            <div className={styles.svgContainer}>
              <svg width="200" height="150" viewBox="0 0 200 150">
                <TracePath
                  d="M40,110 C40,110 40,40 100,40 C160,40 160,110 100,110 C70,110 70,80 100,80"
                  color="#f59e0b"
                  isActive={isActive}
                />
              </svg>
            </div>
          </motion.div>

          {/* 示例 4 */}
          <motion.div className={styles.demoCard} variants={itemVariants}>
            <h3 className={styles.demoTitle}>
              <Sparkles size={20} />
              直线测试
            </h3>
            <div className={styles.svgContainer}>
              <svg width="200" height="150" viewBox="0 0 200 150">
                <TracePath
                  d="M30,75 L170,75"
                  color="#ec4899"
                  isActive={isActive}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SvgDemo;
