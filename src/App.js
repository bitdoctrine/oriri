import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header, MainContainer, CreateContainer } from './components';
import { useStateValue } from './components/context/StateProvider';
import { getMenuItems } from './components/utils/firebaseFunctions';
import { actionType } from './components/context/reducer';

export default function App() {
  const [{ menuItems }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      await getMenuItems().then((data) => {
        dispatch({ type: actionType.SET_MENU_ITEMS, menuItems: data });
      });
    };
    fetchData();
  }, [dispatch]);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-24 p-8 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}
