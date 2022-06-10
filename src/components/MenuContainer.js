import React, { useEffect, useState } from 'react';
import { MdOutlineFastfood } from 'react-icons/md';
import { useStateValue } from './context/StateProvider';
import Row from './Row';
import { categories } from './utils/data';
import { motion } from 'framer-motion';

const MenuContainer = () => {
  const [menuFilter, setMenuFilter] = useState('chicken');
  const [category, setCategory] = useState();
  const [{ menuItems }, dispatch] = useStateValue();
  // const filterResult = menuItems.filter((item) => item.slug === category);

  useEffect(() => {
    setCategory(menuFilter);
  }, [menuFilter]);

  return (
    <div className=" w-full my-2" id="menu">
      <div className=" w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold mr-auto capitalize relative before:absolute before:rounded-lg before:content before:w-60 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tl from-purple-600 to-purple-300 transition-all ease-in-out duration-100">
          Our Hot Menu
        </p>
        <div className=" w-full flex items-center justify-start lg:justify-center gap-4 py-6 overflow-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.8 }}
                onClick={() => setMenuFilter(category.slug)}
                key={category.id}
                className={`group ${
                  menuFilter === category.slug ? 'bg-purple-500' : 'bg-rowBg'
                } w-24 min-w-[94px] shadow-lg hover:bg-purple-500 h-20 cursor-pointer rounded-lg shadow-lg drop-shadow-xl flex flex-col gap-3 duration-150 transition-all ease-in-out items-center justify-center`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    menuFilter === category.slug ? 'bg-white' : 'bg-purple-500'
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <MdOutlineFastfood
                    className={` ${
                      menuFilter === category.slug
                        ? ' text-purple-500'
                        : 'text-white'
                    } text-lg font-bold group-hover:text-purple-500`}
                  />
                </div>
                <p
                  className={`uppercase text-sm ${
                    menuFilter === category.slug
                      ? 'text-white'
                      : 'text-textColor'
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
      <div className=" w-full">
        <Row data={menuItems?.filter((item) => item.category === category)} />
      </div>
    </div>
  );
};

export default MenuContainer;
