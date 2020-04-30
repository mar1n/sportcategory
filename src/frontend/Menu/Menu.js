import React, { useState } from 'react'
import './Menu.css'
import MenuLink from './Menulink'

const Menu = ({ loginInfo }) => {
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
                <div className='title'>{
                        loginInfo.name ? 
                            `Welcome ${loginInfo.name}` :
                            'Hello menu!'
                    }</div>
                    <div className='menu-container'>
                        <MenuLink route='/' iconName='home-icon' linkName='Home' clickHandler={handleClick} />
                        <MenuLink route='/admin/sport/list' iconName='managesports-icon' linkName='Admin Sports' clickHandler={handleClick} />
                        {loginInfo.name
                            ? <MenuLink route='/logout'
                                iconName='logouticon'
                                linkName='Log out'
                                clickHandler={handleClick} />
                            : <MenuLink route='/login'
                                iconName='loginicon'
                                linkName='Log in'
                                clickHandler={handleClick}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu