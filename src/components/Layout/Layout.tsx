import React, { ReactNode } from "react";
import { Smartphone } from "lucide-react";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import useIsMobile from "../../hooks/useIsMobile";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`${styles.layout} ${
        isMobile ? styles.mobile : styles.desktop
      }`}
    >
      {/* 移动端：全屏显示 */}
      {isMobile ? (
        <div className={styles.mobileContainer}>
          <MusicPlayer />
          {children}
        </div>
      ) : (
        /* PC端：手机比例容器 */
        <div className={styles.desktopContainer}>
          {/* 手机比例容器 */}
          <div className={styles.phoneContainer}>
            <MusicPlayer />
            {children}
          </div>

          {/* PC端提示文字 */}
          <div className={styles.desktopHint}>
            <Smartphone size={16} />
            <span>建议在移动设备上查看，观感更佳</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
