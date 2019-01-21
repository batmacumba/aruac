import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Update from './Update';
import Detail from './Detail';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

var querystring = require('querystring');

class AddDirector extends React.Component {
  constructor() {
      super();
      this.state = {
          name: '',
          photo: '',
          story: '',
          messageFromServer: '',
          modalIsOpen: false
      }

      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewDirector = this.insertNewDirector.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
      this.setState({
                    modalIsOpen: true
                    });
  }
  closeModal() {
      this.setState({
                    modalIsOpen: false,
                    name: '',
                    photo: '',
                    story: '',
                    messageFromServer: ''
                    });
  }
  componentDidMount() {
    ;
  }

  onClick(e) {
      this.insertNewDirector(this);
  }

  /**
  * insertNewDirector - sends the data to the server
  * @e: react event
  */
  insertNewDirector(e) {
    const data = new FormData();
    data.append('name', e.state.name);
    data.append('photo', e.state.photo[0].name);
    data.append('story', e.state.story);

    axios.post('/newDirector', data)
      .then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
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

  /**
  * render - manages the UI and calls the state update
  */
  render() {
      if (this.state.messageFromServer == ''){
          return (
                  <div>
                      <div className="button-center">
                          <a href="javascript:void(0);" onClick={this.openModal}><i className="fas fa-2x fa-plus botao"></i></a>
                      </div>
                      <Modal isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      contentLabel="Adicionar novo diretor"
                      className="Modal"
                      style={ {overlay: {zIndex: 10}} }>
                        <div className="frame">
                          <div className="scroll">
                            <button type="button" className="close" aria-hidden="true" onClick={this.closeModal}>&times;</button>
                            <h4 className="modal-title text-modal-title">Adicionar novo diretor</h4>
                            <hr/>
                            <div className="text-modal">
                              <form>

                              <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <div className="row">
                                  <div className="col-sm-11">
                                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="photo">Foto</label>
                                <div className="row">
                                  <div className="col-sm-11">
                                    <FilePond server="/upload"
                                        onupdatefiles={fileItems => {
                                          this.setState({
                                              photo: fileItems.map(fileItem => fileItem.file)
                                          });
                                        }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="story">Currículo</label>
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
                          contentLabel="Add Director"
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
export default AddDirector;
