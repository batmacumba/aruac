//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring');

class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            genre: '',
            year: Number,
            messageFromServer: '',
            modalIsOpen: false
        }
        this.update = this.update.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    componentDidMount() {
        this.setState({
                      id: this.props.project._id,
                      title: this.props.project.title,
                      genre: this.props.project.genre,
                      year: this.props.project.year,
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
    
    onClick(e) {
        this.update(this);
    }
    
    update(e) {
        axios.post('/update',
                   querystring.stringify({
                                         _id: e.state.id,
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
    
    render() {
        if (this.state.messageFromServer == ''){
            return (
                    <div>
                    <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span> Editar </Button>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Expense"
                    className="Modal">
                    <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                    <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span> Deletar </Button>
                    </Link><br/>
                    <fieldset>
                    <label for="title">Title:</label><input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTextChange}></input>
                    <label for="genre">Genre:</label><input type="text" id="genre" name="genre" value={this.state.genre} onChange={this.handleTextChange}></input>
                    <label for="year">Year:</label><input type="number" id="year" name="year" value={this.state.year} onChange={this.handleTextChange}></input>
                    </fieldset>
                    <div className='button-center'>
                    <br/>
                    <Button bsStyle="warning" bsSize="small" onClick={this.onClick}> Atualizar</Button>
                    </div>
                    </Modal>
                    </div>
                    )
        }
        else {
            return (
                    <div>
                    <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span> Editar </Button>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Expense"
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
export default Update;
