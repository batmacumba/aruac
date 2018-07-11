//client/components/Detail.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            genre: '',
            year: Number,
            modalIsOpen: false
        }
        
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
                      });
    }
    
    render() {
            return (
                    <div key={this.props.project._id}>
                      <div className="grid-item loadslider cinema" onClick={this.openModal}>
                        <img src="./img/portifolio/rocha_que_voa/poster.jpg" />
                          <div className="cinema-overlay-bg"></div>
                            <div className="overlay-text">
                            <h3>{this.props.project.title}</h3><hr/>
                            {this.props.project.year}<br/>
                            {this.props.project.genre}<br/>
                        </div>
                      </div>
                      <Modal
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      contentLabel="Project"
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
                    )};
}

export default Detail;
