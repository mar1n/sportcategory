import React from 'react'
import './ManageSports.css'
import { Link } from 'react-router-dom'

const ManageSports = () => 
    <div className='managesports'>
        Place page for the Mange Sports Category (admin) page.
        <Link to='/'>
            <h1>
                Back to homepage!
            </h1>
        </Link>
    </div>
export default ManageSports;