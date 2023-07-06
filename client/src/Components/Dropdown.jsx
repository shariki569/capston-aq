import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const Dropdown = ({label, children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null)


    const handleToggle = () =>{
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        {
          setIsOpen(false)
        };
      };
    
      useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.addEventListener('click', handleClickOutside);
        };
      }, []);


  return (
    <div className='dropdown' ref={dropdownRef}>
        <span className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={handleToggle}> 
            <Link className="link"><h6>{label}</h6></Link>
        </span>
        {isOpen && <div className='dropdown-menu'> {children} </div>}
    </div>
  )
}

export default Dropdown
