import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ children }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="dropdown-menu" >
      <ul className="dropdown-items">{children}</ul>
    </div>
  );
};

export default Dropdown;
