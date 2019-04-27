import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var querystring = require('querystring');

class DelDirector extends React.Component {
    constructor() {
        super();
        this.state = {
            messageFromServer: '',
            modalIsOpen: false
        }
        this.deleteDirector = this.deleteDirector.bind(this);
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
    * deleteDirector - asks server to delete the current Director
    */
    deleteDirector(e) {
        const data = new FormData();
        data.append('_id', this.props.director._id);
        data.append('name', this.props.director.name);
        data.append('token', this.props.token);
        axios.post('/delDirector', data)
        .then(function(response) {
          e.setState({
            messageFromServer: response.data,
            modalIsOpen: true
          });
        });
    }

    /**
    * render - manages the UI and calls the state update
    */
    render() {
        if (this.state.messageFromServer == '') {
            return(
                <div>
                    <div className="button-center">
                        <a href="javascript:void(0);" onClick={this.deleteDirector.bind(this, this)}><i className="fa fa-trash botao"></i></a>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Delete Director"
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
        else {
            return (
                <div>
                    <div className="button-center">
                        <a href="javascript:void(0);" onClick={this.deleteDirector.bind(this, this)}><i className="fa fa-trash botao"></i></a>
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Delete Director"
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
export default DelDirector;
