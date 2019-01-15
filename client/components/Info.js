//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var querystring = require('querystring');

class Info extends React.Component {
    constructor() {
        super();
        this.state = {
            phone: '',
            facebook: '',
            instagram: '',
            youtube: '',
            email: '',
            story: '',
            messageFromServer: '',
            modalIsOpen: false
        }

        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        ;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            phone: nextProps.info.phone,
            facebook: nextProps.info.facebook,
            instagram: nextProps.info.instagram,
            youtube: nextProps.info.youtube,
            email: nextProps.info.email,
            story: nextProps.info.story,
        });
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
    * handleTextChange - updates the component's state
    * @e: react event
    */
    handleTextChange(e) {
      var newState = e.target.value;
      this.setState({ [e.target.name]: newState });
    }

    onClick(e) {
        this.update(this);
    }

    /**
    * update - sends the data to the server
    * @e: react event
    */
    update(e) {
      const data = new FormData();
      data.append('_id', e.state.id);
      Object.keys(e.state).map( name => {
        data.append(name, e.state[name]);
      });

      axios.post('/updateInfo', data)
        .then(function(response) {
          e.setState({
            messageFromServer: response.data
          });
      });
    }

    /**
    * render - manages the UI and calls the state update
    */
    render() {
        console.log(this.state);
        if (this.state.messageFromServer == '') {
          return (
                <div>
                     {/* BOTAO */}
                     <a href="javascript:void(0);" onClick={this.openModal}><i className="fa fa-2x fa-pen">&nbsp;Editar Informações</i></a>

                      <Modal isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      contentLabel="Editar informações"
                      className="Modal Update"
                      style={ {overlay: {zIndex: 10}} }>
                        <div className="frame">
                          <div className="scroll">
                            <button type="button" className="close" aria-hidden="true" onClick={this.closeModal}>&times;</button>
                            <h4 className="modal-title text-modal-title">Editar informações</h4>
                            <hr/>
                            <div className="text-modal">
                              <form>

                                <div className="form-group">
                                  <label htmlFor="phone">Telefone</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="facebook">Facebook</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="facebook" name="facebook" value={this.state.facebook} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="instagram">Instagram</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="instagram" name="instagram" value={this.state.instagram} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="youtube">Youtube</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="youtube" name="youtube" value={this.state.youtube} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="email">Email</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="story">Resumo</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <textarea rows="5" type="text" className="form-control" id="story" name="story" value={this.state.story} onChange={this.handleTextChange}></textarea>
                                    </div>
                                  </div>
                                </div>

                              </form>
                            </div>
                            <div className='button-center'>
                                <br/>
                                <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Salvar</Button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                  </div>
                  )
        }
        else {
            return (
                    <div>
                        <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
                        <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Editar Informações"
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
                    )
        }
    }
}
export default Info;
