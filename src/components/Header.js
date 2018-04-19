import React from 'react'
import { Button } from 'reactstrap'

import '../App.css'

const Header = (props) => {
        let name = props.token ? 'logout' : 'login'
        return (
            <div id="header">
                <h1 className="title">Job Application Tracker</h1>
                <Button className='login' onClick={() => props.clickLogout()}>{name}</Button>
            </div>
        );
}
export default Header;