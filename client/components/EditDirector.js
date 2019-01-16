import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);
var querystring = require('querystring');

class EditDirector extends React.Component {
    constructor() {
        super();
        this.state = {
            _id: '',
            name:'',
            photo:'',
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
        this.setState({
            _id: this.props.director._id,
            name: this.props.director.name,
            photo: this.props.director.photo,
            story: this.props.director.story
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
        data.append('_id', e.state._id);
        data.append('name', e.state.name);
        data.append('photo', e.state.photo[0].name);
        data.append('story', e.state.story);

        axios.post('/editDirector', data)
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
        if (this.state.messageFromServer == ''){
            return (
                    <div>
                        <div className="button-center">
                            <a href="javascript:void(0);" onClick={this.openModal}><i className="fa fa-pen botao"></i></a>
                        </div>
                        <Modal isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Editar diretor"
                        className="Modal"
                        style={ {overlay: {zIndex: 10}} }>
                          <div className="frame">
                            <div className="scroll">
                              <button type="button" className="close" aria-hidden="true" onClick={this.closeModal}>&times;</button>
                              <h4 className="modal-title text-modal-title">Editar diretor</h4>
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
                                        >
                                        <File key={this.props.director.photo} src={this.props.director.photo} />
                                        </FilePond>
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
                    )
        }
    }
}
export default EditDirector;
