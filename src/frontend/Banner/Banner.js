import React from 'react';

import './Banner.css'

export default function Banner({name, hideSuccessfullLogin}) {
    hideSuccessfullLogin();
    return (<div className='Banner'>{
        `Login Successful, welcome ${name}!`
    }</div>);
} 