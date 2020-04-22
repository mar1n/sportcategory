import React, { useState } from 'react'
import './Menu.css'
import menuicon from '../../images/menu-icon.svg'

const Menu = () => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(!visible);
    }
    return (
        <div className={`Menu ${visible ? 'is-visible' : ''}`}>
            <button onClick={handleClick}>
                <img className='icon' src={menuicon} alt='menu icon'></img>
            </button>
            <div className='panel'>
                <div className='dimmer' onClick={handleClick} />
                <div className='bar'><div className='title'>Hello menu!</div>
                </div>
            </div>
        </div>
    )
}
export default Menu;