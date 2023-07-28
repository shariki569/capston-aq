import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ children }) => {
  const [click, setClick] = useState(false);
  const handleClick = ( ) => setClick(!click);

  return (
    <ul onClick={handleClick} className={ click ? 'dropdown click' : 'dropdown'} >
      {click && (
        <li className="dropdown-menu" >
          {children}
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
