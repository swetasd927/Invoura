// assets/generatebtn.jsx
import React from "react";
import "./generatebtn.css";

const GenerateBtn = ({ text = "Generate", onClick }) => {
  return (
    <button className="generate-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default GenerateBtn;
