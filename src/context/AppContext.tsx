import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  sameBirthday?: number;
  totalDays?: number;
  topCourse?: string;
  friendsCount?: number;
  [key: string]: unknown;
}

interface AppContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AppContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        userData,
        setUserData,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
