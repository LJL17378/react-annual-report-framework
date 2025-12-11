import { useState, useEffect } from 'react';

/**
 * 检测当前设备是否为移动端的hook
 * 默认断点为768px（常见移动端断点）
 *
 * @param breakpoint 可自定义断点，默认768px
 * @returns 是否为移动端
 */
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // 初始检查
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // 立即执行一次检查
    checkIsMobile();

    // 添加resize事件监听
    const handleResize = () => {
      checkIsMobile();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;