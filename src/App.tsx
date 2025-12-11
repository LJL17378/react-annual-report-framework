import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';

import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Cover from './pages/Cover';
import Birthday from './pages/Birthday';
import Summary from './pages/Summary';

const PAGES = [
  { Component: Cover, name: 'cover' },
  { Component: Birthday, name: 'birthday' },
  { Component: Summary, name: 'summary' },
];

const AppContent: React.FC = () => {
  const { setActiveIndex, setUserData } = useApp();

  useEffect(() => {
    setUserData({
      sameBirthday: 128,
      totalDays: 365,
      friendsCount: 256,
      topCourse: 'React Advanced',
    });
  }, [setUserData]);

  return (
    <Layout>
      <Swiper
        direction="vertical"
        modules={[Mousewheel]}
        mousewheel={true}
        speed={500}
        style={{ height: '100vh', width: '100vw' }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        threshold={10}
      >
        {PAGES.map(({ Component, name }, index) => (
          <SwiperSlide key={name}>
            <Component pageIndex={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
