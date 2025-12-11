import React, { ReactNode } from 'react';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <MusicPlayer />
      {children}
    </div>
  );
};

export default Layout;
