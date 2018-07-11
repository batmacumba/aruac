//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Update from './Update';
import Detail from './Detail';

var querystring = require('querystring');

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            genre: '',
            year: Number,
            messageFromServer: '',
            modalIsOpen: false
        }

        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewProject = this.insertNewProject.bind(this);
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
                      title: '',
                      genre: '',
                      year: '',
                      messageFromServer: ''
                      });
    }
    componentDidMount() {
        ;
    }
    
    onClick(e) {
        this.insertNewProject(this);
    }
    
    insertNewProject(e) {
        axios.post('/insert',
                   querystring.stringify({
                                         title: e.state.title,
                                         genre: e.state.genre,
                                         year: e.state.year
                                         }), {
                   headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                   }
                   }).then(function(response) {
                           e.setState({
                                      messageFromServer: response.data
                                      });
                           });
    }
    handleTextChange(e) {
        if (e.target.name == "title") {
            this.setState({
                          title: e.target.value
                          });
        }
        if (e.target.name == "genre") {
            this.setState({
                          genre: e.target.value
                          });
        }
        if (e.target.name == "year") {
            this.setState({
                          year: e.target.value
                          });
        }
    }
    render() {
        if(this.state.messageFromServer == ''){
            return (
                    <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span> Adicionar projeto</Button>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Project"
                    className="Modal">
                    <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                    <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
                    </Link><br/>
                    <fieldset>
                    <label for="title">Title:</label><input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTextChange}></input>
                    <label for="genre">Genre:</label><input type="text" id="genre" name="genre" value={this.state.genre} onChange={this.handleTextChange}></input>
                    <label for="year">Year:</label><input type="number" id="year" name="year" value={this.state.year} onChange={this.handleTextChange}></input>
                    
                    </fieldset>
                    <div className='button-center'>
                    <br/>
                    <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Project</Button>
                    </div>
                    </Modal>
                    </div>
                    )
        }
        else{
            return (
                    <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Project"
                    className="Modal">
                    <div className='button-center'>
                    <h3>{this.state.messageFromServer}</h3>
                    <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                    <Button bsStyle="success" bsSize="small" onClick={this.closeModal}>Close the Dialog</Button>
                    </Link>
                    </div>
                    </Modal>
                    </div>
                    )
        }
    }
}
export default Add;
