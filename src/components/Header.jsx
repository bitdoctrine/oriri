import React, { useState } from 'react';
import Logo from '../img/logo.png';
import userAvater from '../img/avatar.png';
import { CgShoppingBag, CgAdd, CgLogOut } from 'react-icons/cg';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

export default function Header() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setMenu(!menu);
    }
  };

  const logout = () => {
    setMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    navigate('/');
  };

  return (
    <header className=" bg-primary drop-shadow-sm fixed z-50 w-screen p-2 px-2 md:px-16 md:p-6">
      {/*big and medium screen */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link
          to={'/'}
          onClick={() => setMenu(false)}
          className="flex items-center gap-2"
        >
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">oriri</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ x: 200, opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            className="flex items-center gap-8 "
          >
            <motion.li
              onClick={() => setMenu(false)}
              whileTap={{ scale: 0.6 }}
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            >
              Home
            </motion.li>
            <motion.li
              onClick={() => setMenu(false)}
              whileTap={{ scale: 0.6 }}
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            >
              Menu
            </motion.li>
            <motion.li
              onClick={() => setMenu(false)}
              whileTap={{ scale: 0.6 }}
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            >
              Advisory
            </motion.li>
            <motion.li
              onClick={() => setMenu(false)}
              whileTap={{ scale: 0.6 }}
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
            >
              Cataring School
            </motion.li>
          </motion.ul>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: 0 }}
            whileTap={{ scale: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <CgShoppingBag
              onClick={() => setMenu(false)}
              className="text-purple-600 text-2xl cursor-pointer"
            />
            <div className=" cursor-pointer absolute  -top-3 -right-3 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </motion.div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : userAvater}
              className="rounded-full w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer"
              alt="user"
              onClick={login}
            />
            {menu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 flex flex-col p-2 bg-primary shadow-xl rounded-lg absolute top-8 px-4  right-0"
              >
                {user && user.email === 'frokorie013@gmail.com' && (
                  <Link to="/createItem" onClick={() => setMenu(false)}>
                    <p className="flex  p-2 items-center cursor-pointer hover:bg-slate-200 gap-3 transition-all ease-in-out text-textColor text-base justify-center ">
                      Add Item <CgAdd />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logout}
                  className="flex px-4 py-2 items-center cursor-pointer gap-3 hover:bg-slate-200 transition-all ease-in-out text-textColor text-base  justify-center "
                >
                  Logout <CgLogOut />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile*/}
      <div className="md:hidden flex w-full h-full flex-center justify-between ">
        <motion.div
          onClick={() => setMenu(false)}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0, y: 0 }}
          whileTap={{ scale: 0.6 }}
          className="relative  flex items-center justify-center"
        >
          <CgShoppingBag className="text-purple-600 text-2xl cursor-pointer" />
          <div className=" cursor-pointer absolute  -top-1 -right-3 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
        </motion.div>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : userAvater}
            className="rounded-full w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer"
            alt="user"
            onClick={login}
          />
          {menu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 flex flex-col p-2 bg-primary shadow-xl rounded-lg absolute top-8 px-4  right-0"
            >
              {user && user.email === 'frokorie013@gmail.com' && (
                <Link onClick={() => setMenu(false)} to="/createItem">
                  <p className="flex justify-center  py-2  items-center cursor-pointer hover:bg-slate-200 gap-3 duration-100 transition-all ease-in-out text-textColor text-base">
                    Add Item <CgAdd />
                  </p>
                </Link>
              )}
              <ul className="flex  flex-col  ">
                <li className="text-base px-4 py-2 hover:bg-slate-200 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Home
                </li>
                <li className="text-base px-4 py-2 hover:bg-slate-200 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Menu
                </li>
                <li className="text-base px-4 py-2 hover:bg-slate-200 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Advisory
                </li>
                <li className="text-base px-4 py-2 hover:bg-slate-200 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  School
                </li>
              </ul>
              <p
                onClick={logout}
                className=" duration-100 flex px-4  py-2 items-center cursor-pointer gap-3 hover:bg-slate-200 transition-all ease-in-out text-red-600 text-base "
              >
                Logout <CgLogOut />
              </p>
            </motion.div>
          )}
        </div>

        <Link
          onClick={() => setMenu(false)}
          to={'/'}
          className="flex items-center gap-2"
        >
          <p className="text-headingColor text-xl font-bold">oriri</p>
          <img src={Logo} className="w-8 object-cover" alt="logo" />
        </Link>
      </div>
    </header>
  );
}
