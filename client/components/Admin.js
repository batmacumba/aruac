import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var querystring = require('querystring');

class Admin extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        ;
    }
    
    /**
     * render: manages the UI and calls the state update
     */
    render() {
        return (
            <div className="text-common login">
                <Link to="/cadastrar">CADASTRAR</Link><hr/>
                <Link to="/logar">LOGIN</Link>
            </div>
        );
    }
}

export default Admin;
