import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var querystring = require('querystring');

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            messageFromServer: '',
            modalIsOpen: false
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.submit = this.submit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        ;
    }
    
    openModal() {
        this.setState({
                      modalIsOpen: true
                      });
        
    }
    closeModal() {
        this.setState({
                      modalIsOpen: false,
                      messageFromServer: ''
                      });
    }
    
    
    
    /**
     * submit - submits data
     ***************************************************************************
     *     ESSA SENHA SERÁ ENVIADA VIA HTTPS AO SERVIDOR, ACHEI SUFICIENTE     *
     ***************************************************************************
     * @e: react event
     */
    submit(e) {
        const data = new FormData();
        data.append('username', e.state.username);
        data.append('password', e.state.password);
        
        axios.post('/newUser', data)
        .then(function(response) {
            e.setState({
                messageFromServer: response.data,
                modalIsOpen: true
                });
            });
    }
    
    onClick(e) {
        this.submit(this);
    }
    
    /**
     * handleTextChange: updates the component's state
     * @e: react event
     */
    handleTextChange(e) {
        var newState = e.target.value;
        this.setState({ [e.target.name]: newState });
    }

    /**
     * render: manages the UI and calls the state update
     */
    render() {
        console.log(this.state);
        if (this.state.messageFromServer == '') {
            return (
                <div className="text-aruac login">
                    <h4>Cadastrar</h4>
                    <hr/>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Nome de usuário</label>
                            <div className="row">
                                <div className="col-sm-11">
                                <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleTextChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <div className="row">
                                <div className="col-sm-11">
                                <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleTextChange}></input>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='button-center'>
                        <br/>
                        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Salvar</Button>
                    </div>
                </div>
                );
        }
        else {
            return (
                    <div>
                        <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Edit Director"
                        className="Modal"
                        style={ {overlay: {zIndex: 10}} }>
                            <div className='button-center'>
                                <h3>{this.state.messageFromServer}</h3>
                                <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                                    <Button bsStyle="success" bsSize="small" onClick={this.closeModal}>Fechar</Button>
                                </Link>
                            </div>
                        </Modal>
                    </div>
                    );
        }
    }
}

export default SignUp;
