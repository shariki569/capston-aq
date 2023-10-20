import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ children }) => {
  return (
    <div className="dropdown-menu" >
      <ul className="dropdown-items">{children}</ul>
    </div>
  );
};

export default Dropdown;
