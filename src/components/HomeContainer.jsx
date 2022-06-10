import React from 'react';
import delivery from '../img/delivery.png';
import heroBg from '../img/heroBg.png';
import { staticImg } from './utils/data';
import { motion } from 'framer-motion';

export const HomeContainer = () => {
  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
    >
      <div className=" gap-6 h-[90%] flex flex-col flex-1 items-start  justify-start">
        <div className="flex px-4 py-1 items-center gap-12 justify-center rounded-lg bg-purple-200">
          <p className="text-base text-purple-600 font-semibold">
            Quick Delivery in Minutes
          </p>
          <div className="w-8 bg-purple-100 rounded-full h-8 overflow-hidden">
            <img
              src={delivery}
              className="w-full h-full object-contain"
              alt="Bike Delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wider text-headingColor">
          The Fastest Delivery in{' '}
          <span className="text-purple-600 text-[3rem] lg:text-[5rem]">
            Abuja
          </span>
        </p>

        <p className="text-base text-textColor text-right md:text-left md:w-[80%]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ab
          quam iusto rem voluptas esse, consequatur assumenda soluta nulla,
          dolores, quo dignissimos fugiat. Temporibus, doloribus ea. Quibusdam
          ea sunt ullam!
        </p>

        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          className="bg-gradient-to-tl first-letter: text-purple-300 from-purple-900 to-purple-600 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 font-bold"
        >
          Place An Order
        </motion.button>
      </div>
      <div className="py-2 relative  flex-1 items-center">
        <img
          src={heroBg}
          className="ml-auto h-420 w-full lg:w-auto lg:h-[600px]"
          alt="Hero Background"
        />
        <div className="w-full  h-[90%] absolute top-0  left-0  flex items-center justify-center lg:px-28 py-4 gap-10 lg:gap-3 flex-wrap">
          {staticImg &&
            staticImg.map((item) => (
              <motion.div
                key={item.id}
                className="  lg:w-190  p-2 flex-col bg-cardOverlay backdrop-blur-md rounded-3xl flex md:gap-3 items-center justify-center"
              >
                <img
                  src={item.source}
                  className="cursor-pointer w-20 lg:w-30 -mt-10  lg:-mt-10"
                  alt="dish"
                />
                <p className="text-base lg:text-lg text-center font-semibold text-orange-700 mt-2 lg:mt-4 ">
                  {item.name}
                </p>
                <p className="text-[10px] lg:text-xs my-1 lg:my-3 text-orange-900 font-semibold text-center px-3">
                  {item.desc}
                </p>
                <p>
                  <motion.button
                    className="p-1 bg-purple-200 rounded-3xl my-1"
                    whileTap={{ scale: 0.6 }}
                  >
                    <span className="text-sm bg-gradient-to-tl text-orange-300 from-orange-900 to-orange-600 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 font-bold">
                      {item.price}
                    </span>
                  </motion.button>
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
