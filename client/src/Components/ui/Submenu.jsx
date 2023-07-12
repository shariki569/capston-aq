import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Submenu = ({submenuItems}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }
  
  return (
    <div className="submenu">
      <span className='submenu-toggle' onClick={toggleCollapse}>
          {isCollapsed ? 'Expand' : 'Collapse'}
      </span>
        {!isCollapsed && (
          <ul>
            {submenuItems.map ((submenuItem, index) => (
              <li key={index}>
                <Link className="sub-links" to={submenuItem.path}>
                  {submenuItem.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default Submenu
