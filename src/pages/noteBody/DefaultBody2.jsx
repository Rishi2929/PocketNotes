import React from "react";
import { IoMdLock } from 'react-icons/io';

import bookImg from "../../assets/images/book-lady.svg";

const DefaultBody = () => {
  return (
    <div className="w-full bg-[#F7ECDC] h-screen">
      <div className="grid h-[96%] place-items-center">
        <div className="grid place-items-center gap-4">
          <img src={bookImg} alt="" />
          <h1 className="text-5xl tracking-[0.06rem] ">Pocket Notes</h1>
          <p className="text-xl w-[42vw] text-[#292929] tracking-[0.0275rem]">
            Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked
            devices and 1 mobile phone
          </p>
        </div>
      </div>

      <footer className="flex items-center justify-center">
        <IoMdLock className="text-[#292929]" />
        <span className="text-base text-[#292929] tracking-[0.0275rem]">end-to-end encrypted</span>
      </footer>
    </div>
  );
};

export default DefaultBody;
