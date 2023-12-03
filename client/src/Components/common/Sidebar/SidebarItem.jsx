import React, { useState } from 'react'
import { HiChevronDown, HiOutlinePaperClip } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ item, icon }) => {

    const [open, setOpen] = useState(true);
    const location = useLocation();


    if (item.submenu) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <Link
                    to={item.path || ''} className="sidebar-title"
                    style={{ textDecoration: 'none' }}
                >
                    <span>
                        {item.icon && (
                            <span className='sidebar-icon'>{item.icon}</span>
                        )}
                        {item.title}
                    </span>
                    <HiChevronDown
                        size={25}
                        className='sidebar-toggle toggle-btn'
                        onClick={() => setOpen(!open)} />
                </Link>
                <div className='sidebar-content'>
                    {item.submenu.map((submenu, index) => <SidebarItem key={index} item={submenu} />)}
                </div>
            </div>
        )
    } else {
        return (
            <Link to={item.path || ''}
                className={location.pathname === item.path ? " active" : "sidebar-item plain"}
                style={{ textDecoration: 'none' }}
            >
                {item.icon && (
                    <span className='sidebar-icon'>{item.icon}</span>
                )}
                {item.title}
            </Link>
        )

    }

}

export default SidebarItem
