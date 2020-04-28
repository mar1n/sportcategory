import React, { useState } from 'react'
import './Menu.css'
import MenuLink from './Menulink'

const Menu = () => {
    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        setVisible(!visible)
    }
    return (
        <div className={`Menu ${visible ? 'is-visible' : ''}`}>
            <button onClick={handleClick}>
                <img className='icon' src={require(`../../images/menu-icon.svg`)} alt='menu icon'></img>
            </button>
            <div className='panel'>
                <div className='dimmer' onClick={handleClick} />
                <div className='bar'>
                    <div className='title'>
                        Hello menu!
                    </div>
                    <div className='menu-container'>
                        <MenuLink route='/' iconName='home-icon' linkName='Home' clickHandler={handleClick} />
                        <MenuLink route='/manage/sports' iconName='managesports-icon' linkName='Manage Sports' clickHandler={handleClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu