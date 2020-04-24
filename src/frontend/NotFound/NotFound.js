import React from 'react'
import { Link } from 'react-router-dom'

 const NotFound = () => {
    return(
        <div>
            <h1>Page doesn't exsist!!!</h1>
            <Link to='/'>Back to Home Page</Link>
        </div>
    )
}

export default NotFound