import React from 'react';
import Logo from '../img/logo.png';
import userAvater from '../img/avatar.png';
import { CgShoppingBag } from 'react-icons/cg';

export default function Header() {
  return (
    <header className=" fixed z-50 w-screen px-16 p-3">
      {/*big and medium screen */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">oriri</p>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 ">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Advisory
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Cataring School
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <CgShoppingBag className="text-textColor text-2xl cursor-pointer" />
            <div className=" cursor-pointer absolute  -top-3 -right-3 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <img
            src={userAvater}
            className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer"
            alt="user"
          />
        </div>
      </div>
      {/* mobile*/}
      <div className="md:hidden flex w-full h-full "></div>
    </header>
  );
}
