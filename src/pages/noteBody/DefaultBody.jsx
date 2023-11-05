import React from "react";
import { IoMdLock } from "react-icons/io";

import bookImg from "../../assets/images/book-lady.svg";
import "./defaultBody.scss";

const DefaultBody = () => {
  return (
    <div className="default-body-container">
      <div className="default-body">
        <div className="content">
          <img src={bookImg} alt="" />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked
            devices and 1 mobile phone
          </p>
        </div>
      </div>

      <footer className="footer">
        <IoMdLock className="lock-icon" />
        <span className="encryption-text">end-to-end encrypted</span>
      </footer>
    </div>
  );
};

export default DefaultBody;
