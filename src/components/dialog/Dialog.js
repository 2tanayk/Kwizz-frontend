import React from "react";
import "./index.css";

const Dialog = ({text,leftBtnText,rightBtnText,onLeftBtnClick,onRightBtnClick}) => {
  return (
    <>
      <div className="container">
        <div className="confirmation-text">
          {text}
        </div>
        <div className="button-container">
          <button onClick={onLeftBtnClick} className="cancel-button">{leftBtnText}</button>
          <button onClick={onRightBtnClick} className="confirmation-button">{rightBtnText}</button>
        </div>
      </div>
      <div className="confirm-bg"></div>
    </>
  );
};

export default Dialog;
