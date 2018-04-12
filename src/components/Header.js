import React from 'react'
import { Button } from 'reactstrap'

import '../App.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let name = this.props.token ? 'logout' : 'login'
        return (
            <div id="header">
                <h1 className="title">Job Application Tracker</h1>
                <Button className='login' onClick={() => this.props.clickLogout()}>{name}</Button>
            </div>
        );
    }
}