import React, { useState } from 'react'
import './Menu.css'
import menuicon from '../../images/menu-icon.svg'
import sportsicon from '../../images/managesports.svg'
import { Link } from 'react-router-dom'


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
                <div className='bar'>
                    <div className='title'>
                        Hello menu!
                    </div>
                    <div className='menu-container'>
                        <Link to='/manage/sports' onClick={handleClick}>
                            <div className='item'>
                                <img className='icon' src={sportsicon} alt='manage-sports' />
                                <div className='itemName'>Mange Sports</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu;