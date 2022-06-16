import React, { useEffect, useState } from 'react';
import { BsCartPlusFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import notFound from '../img/NotFound.svg';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

const Row = ({ flag, data }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const slideLeft = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 350;
  };

  const slideRight = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 350;
  };

  const addToCart = (item) => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...cartItems, item],
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  return (
    <div className="flex relative items-center">
      <motion.div
        onClick={slideLeft}
        whileTap={{ scale: 0.8 }}
        className={`mx-1  cursor-pointer hidden ${
          !flag ? 'md:hidden lg:hidden' : 'md:flex'
        } items-center w-6 bg-purple-600 rounded-full p-1 text-white`}
      >
        <MdChevronLeft />
      </motion.div>
      <div
        id="slider"
        className={`w-full flex bg-slate-100 scroll-smooth items-center justify-center gap-3 my-12  px-2 rounded-lg ${
          flag
            ? 'overflow-x-scroll scrollbar-none'
            : 'overflow-x-hidden flex-wrap'
        }`}
      >
        {data && data.length ? (
          data.map((item) => (
            <motion.div
              key={item.id}
              className="w-250 h-auto min-w-[250px] md:min-w-[340] md:w-250 my-12 p-2 rounded-3xl hover:scale-110 cursor-pointer bg-cardOverlay transition-all duration-1000 ease-linear drop-shadow-lg backdrop-blur-lg"
            >
              <div className="w-full flex items-center justify-between">
                <motion.img
                  src={item.imageUrl}
                  alt="fruit"
                  className="w-44 -mt-8 transition-all duration-200 ease-in cursor-pointer"
                />
                <motion.div
                  onClick={() => addToCart(item)}
                  whileTap={{ scale: 0.7 }}
                  className="w-10 h-10 rounded-full cursor-pointer  border bg-red-600 flex items-center justify-center hover:shadow-md"
                >
                  <BsCartPlusFill className="w-full text-white" />
                </motion.div>
              </div>

              <div className="w-full flex flex-col items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item.title}
                </p>
                <p className="mt-1 text-sm">{item.calories}</p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-red-600 font-semibold">
                    <span className="text-sm">#</span>
                    {item.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className=" w-full flex flex-col text-center justify-center">
            <div className="w-full flex flex-col items-center justify-center">
              <img
                src={notFound}
                className=" w-[20%] text-center "
                alt="Not Found"
              />
            </div>
            <p className=" uppercase text-bold font-bold text-purple-600 ">
              Sorry, We Ran Out Of That
            </p>
          </div>
        )}
      </div>
      <motion.div
        onClick={slideRight}
        whileTap={{ scale: 0.8 }}
        className={`cursor-pointer mx-1 hidden ${
          !flag ? 'md:hidden lg:hidden' : 'md:flex'
        } items-center w-6  bg-purple-600 rounded-full p-1 text-white`}
      >
        <MdChevronRight />
      </motion.div>
    </div>
  );
};

export default Row;
