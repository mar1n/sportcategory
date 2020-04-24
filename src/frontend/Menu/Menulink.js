import React from 'react'
import { Link } from 'react-router-dom'

const MenuLink = ({ route, iconName, linkName, clickHandler }) => {
    return (
        <Link className='item' to='/manage/sports' to={route} onClick={clickHandler}>
            <div>
                <img className='icon' src={require(`../../images/${iconName}.svg`)} alt={`${linkName} icon`} />
                <div className='itemName'>{linkName}</div>
            </div>
        </Link>
    )
}

export default MenuLink;