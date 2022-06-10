import React, { useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { RiRefreshFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import dummyImage from '../img/f1.png';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
const Cart = () => {
  const [cart, setCart] = useState(false);

  const [{ cartShow }, dispatch] = useStateValue();
  return (
    <motion.div
      initial={{ scale: 0.2, y: 200 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 200 }}
      className={`fixed ${
        cart && 'hidden'
      } top-0 right-0 z-[100] p-3 w-full md:w-375 h-full bg-purple-700 drop-shadow-md flex flex-col`}
    >
      <div className="w-full flex items-center justify-between p-1">
        <motion.div
          onClick={() =>
            dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow })
          }
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer "
        >
          <MdOutlineKeyboardBackspace className=" text-2xl text-white hover:scale-110 transition-all duration-100 ease-in-out" />
        </motion.div>
        <p className=" text-lg font-semibold text-white">Cart</p>
        <motion.p
          whileTap={{ scale: 0.5 }}
          className="flex items-center gap-2 px-2 my-2  rounded-md hover:shadow-md duration-100 transition-all cursor-pointer text-white"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      <div className="w-full h-full bg-purple-600 rounded-3xl">
        <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
          <div className="w-full p-1 px-2 rounded-lg bg-purple-500 flex items-center gap-2">
            <img
              src={dummyImage}
              alt="dummyImg"
              className="w-20 h-20 max-w-[60px] rounded-full object-contain"
            />
            <div className="flex flex-col gap-2">
              <p className="text-base text-white">Wild Fruit</p>
              <p className="text-sm block text-white font-semibold">#350.99</p>
            </div>
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
              <motion.div className="text-white" whileTap={{ scale: 0.7 }}>
                <AiOutlineMinus />
              </motion.div>
              <p className="w-5 h-5 rounded-sm bg-purple-600 text-white flex items-center justify-center">
                1
              </p>
              <motion.div className="text-white" whileTap={{ scale: 0.7 }}>
                <AiOutlinePlus />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-full bg-purple-600 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">Sub Total</p>
            <p className="text-white text-lg">#2300.99</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">Delivery</p>
            <p className="text-white text-lg">#200.99</p>
          </div>
          <div className="w-full border-b border-purple-100 my-2"></div>
          <div className=" w-full flex items-center justify-between">
            <p className="text-white text-xl font-semibold">Total</p>
            <p className="text-white text-xl font-semibold">#2501.98</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.7 }}
            type="button"
            className="w-full p-2 rounded-full bg-gradient-to-bl from-purple-800 to-purple-600 text-white text-lg my-2 hover:shadow-lg transition-all duration-150 ease-in-out"
          >
            Checkout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
