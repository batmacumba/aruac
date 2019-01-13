//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import Detail from './Detail';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

var querystring = require('querystring');

class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            director: [''],
            year: '',
            trailer: '',
            stills: [],
            thumbnail: '',
            genre: '',
            duration: '',
            country: [''],
            crew: [{
              role: 'Função',
              name: 'Nome'
            }],
            cast: [''],
            storyline: '',
            awards: [''],
            festivals: [''],
            reviews: [''],
            messageFromServer: '',
            modalIsOpen: true
        }

        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.displayFields = this.displayFields.bind(this);
        this.prepend = this.prepend.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
      /* crew retrieve from db */
      let crewCopy = this.props.project.crew[0].split('*!&').reverse();
      this.props.project.crew = [];
      for (var i = 0; i < crewCopy.length; i++) {
        var par = crewCopy[i].split('*!');
        if (par[0] == '') ;
        else {
          var crewMember = {
            role: '',
            name: ''
          };
          crewMember.role = par[0];
          crewMember.name = par[1];
          this.props.project.crew.unshift(crewMember);
        }
      }

      this.setState({
        id: this.props.project._id,
        title: this.props.project.title,
        director: this.props.project.director,
        year: this.props.project.year,
        trailer: this.props.project.trailer,
        stills: this.props.project.stills,
        thumbnail: this.props.project.thumbnail,
        genre: this.props.project.genre,
        duration: this.props.project.duration,
        country: this.props.project.country,
        crew: this.props.project.crew,
        cast: this.props.project.cast,
        storyline: this.props.project.storyline,
        awards: this.props.project.awards,
        festivals: this.props.project.festivals,
        reviews: this.props.project.reviews,
        category: this.props.project.category
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
      /* files */
      if (e.target.files) {
        this.setState({ [e.target.name]: e.target.files });
        return;
      }

      var i;
      /* crew */
      if (e.target.name == "crew") i = parseInt(e.target.id.split(" ")[2]);
      /* etc */
      else i = parseInt(e.target.id.split(" ")[1]);
      /* single element */
      if (isNaN(i))
        this.setState({ [e.target.name]: e.target.value });
      /* array */
      else {
        const newState = this.state[e.target.name].slice();
        if (e.target.name == "crew") {
          if (e.target.id.split(" ")[1] == "name") newState[i].name = e.target.value;
          else newState[i].role = e.target.value;
        }
        else newState[i] = e.target.value;
        this.setState({ [e.target.name]: newState });
      }
    }

    /**
    * prepend - adds a new element to the beggining of the given state
    * @fieldName: name of the state we wish to prepend to
    */
    prepend(fieldName) {
      const newState = this.state[fieldName].slice();
      newState.unshift(this.state[fieldName][0]);
      if (fieldName == "crew") newState[0] = { role: '', name: '' };
      else newState[0] = '';
      this.setState({ [fieldName]: newState });

      if (fieldName == "crew") {
        document.getElementById(fieldName + " role 0").value = '';
        document.getElementById(fieldName + " name 0").value = '';
        document.getElementById(fieldName + " role 0").focus();
        /* bug workaround */
        document.getElementById(fieldName + " role 1").value = newState[1].role;
        document.getElementById(fieldName + " name 1").value = newState[1].name;
      }
      else {
        document.getElementById(fieldName + " 0").value = '';
        document.getElementById(fieldName + " 0").focus();
        /* bug workaround */
        document.getElementById(fieldName + " " + 1).value = newState[1];
      }
    }

    /**
    * remove - removes the state's element at the given index
    * @fieldName: name of the state we wish to remove from
    * @i: index of the element we wish to remove
    */
    remove(fieldName, i) {
      const newState = this.state[fieldName].slice();
      newState.splice(i, 1);
      this.setState({ [fieldName]: newState });
      /* bug workaround */
      if (fieldName == "crew") {
        document.getElementById(fieldName + " role " + i).value = newState[i].role;
        document.getElementById(fieldName + " name " + i).value = newState[i].name;
      }
      else document.getElementById(fieldName + " " + i).value = newState[i];
    }

    /**
    * displayFields - returns the element associated with a given state and index
    * @fieldName: name of the state we wish to display
    * @i: index of the element
    */
    displayFields(fieldName, i) {
      /* returns 1D string array fields */
      if (fieldName != "crew") {
          if (i == 0)
            return (
              <div className="row form-group" key={fieldName + i}>
                <div className="col-sm-11">
                  <input type="text" className="form-control" id={fieldName + " " + i} name={fieldName} onChange={this.handleTextChange} placeholder={this.state[fieldName][i]}></input>
                </div>
                <div className="col-sm-1">
                  <a href="javascript:void(0);" onClick={this.prepend.bind(this, fieldName)}><i className="fa fa-2x fa-plus"></i></a>
                </div>
              </div>
              );
          else
            return (
              <div className="row form-group" key={fieldName + i}>
                <div className="col-sm-11">
                  <input type="text" className="form-control" id={fieldName + " " + i} name={fieldName} onChange={this.handleTextChange} placeholder={this.state[fieldName][i]}></input>
                </div>
                <div className="col-sm-1">
                  <a href="javascript:void(0);" onClick={this.remove.bind(this, fieldName, i)}><i className="fa fa-2x fa-minus"></i></a>
                </div>
              </div>
            );
      }
      /* returns 2D string array fields */
      else {
        if (i == 0)
            return (
              <div className="row form-group" key={fieldName + i}>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id={fieldName + " role " + i} name={fieldName} onChange={this.handleTextChange} placeholder={this.state[fieldName][i].role}></input>
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control" id={fieldName + " name " + i} name={fieldName} onChange={this.handleTextChange} placeholder={this.state[fieldName][i].name}></input>
                </div>
                <div className="col-sm-1">
                  <a href="javascript:void(0);" onClick={this.prepend.bind(this, fieldName)}><i className="fa fa-2x fa-plus"></i></a>
                </div>
              </div>
            );
          else
            return (
              <div className="row form-group" key={fieldName + i}>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id={fieldName + " role " + i} name={fieldName} onChange={this.handleTextChange} placeholder={this.state[fieldName][i].role}></input>
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control" id={fieldName + " name " + i} name={fieldName} onChange={this.handleTextChange} placeholder={this.state[fieldName][i].name}></input>
                </div>
                <div className="col-sm-1">
                  <a href="javascript:void(0);" onClick={this.remove.bind(this, fieldName, i)}><i className="fa fa-2x fa-minus"></i></a>
                </div>
              </div>
            );
      }
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
        if (name == "crew") {
          var equipe = '';
          for (var i = 0; i < e.state[name].length; i++)
            equipe = equipe + e.state[name][i].role + '*!' + e.state[name][i].name + '*!&';
          data.append(name, equipe);
        }
        else if (name == "stills" || name == "thumbnail") ;
        else data.append(name, e.state[name]);
      });

      data.append('thumbnail', e.state.thumbnail[0].name);
      for (var i = 0; i < e.state.stills.length; i++)
        data.append('stills', e.state.stills[i].name);


      axios.post('/update', data)
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
                      <hr/>
                      <Modal isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      contentLabel="Editar projeto"
                      className="Modal Update"
                      style={ {overlay: {zIndex: 10}} }>
                        <div className="frame">
                          <div className="scroll">
                            <button type="button" className="close" aria-hidden="true" onClick={this.closeModal}>&times;</button>
                            <h4 className="modal-title text-modal-title">Editar projeto</h4>
                            <hr/>
                            <div className="text-modal">
                              <form>

                              <div className="form-group">
                                <label htmlFor="category">Categoria</label>
                                <div className="row">
                                  <div className="col-sm-11">
                                    <select id="category" name="category" value={this.state.category} onChange={this.handleTextChange}>
                                        <option value="cinema">Cinema</option>
                                        <option value="tv">TV</option>
                                        <option value="teatro">Teatro</option>
                                        <option value="etc">Outros</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                                <div className="form-group">
                                  <label htmlFor="title">Nome do projeto</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="title" name="title" value={this.state.title} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label>Diretores</label>
                                  { this.state.director.map((el, i) => {
                                    return (this.displayFields("director", i) );
                                  })}
                                </div>

                                <div className="form-group">
                                  <label htmlFor="year">Ano de lançamento</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="year" name="year" value={this.state.year} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="trailer">Trailer (URL)</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="trailer" name="trailer" value={this.state.trailer} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="stills">Stills</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                    <FilePond allowMultiple={true}
                                              server="/upload"
                                              onupdatefiles={fileItems => {
                                                  this.setState({
                                                      stills: fileItems.map(fileItem => fileItem.file)
                                                  });
                                              }}
                                    >
                                    {this.state.stills.map(file => {
                                        return <File key={file} src={file} />;
                                     })}

                                    </FilePond>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="thumbnail">Thumbnail (16:9)</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <FilePond server="/upload"
                                                onupdatefiles={fileItems => {
                                                    this.setState({
                                                        thumbnail: fileItems.map(fileItem => fileItem.file)
                                                    });
                                                }}
                                      >
                                      <File key={this.props.project.thumbnail} src={this.props.project.thumbnail} />
                                      </FilePond>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="genre">Gênero</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="genre" name="genre" value={this.state.genre} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="duration">Duração em minutos</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <input type="text" className="form-control" id="duration" name="duration" value={this.state.duration} onChange={this.handleTextChange}></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label>País</label>
                                  { this.state.country.map((el, i) => {
                                    return (this.displayFields("country", i) );
                                  })}
                                </div>

                                <div className="form-group">
                                  <label>Equipe</label>
                                  { this.state.crew.map((el, i) => {
                                    return (this.displayFields("crew", i) );
                                  })}
                                </div>

                                <div className="form-group">
                                  <label>Elenco</label>
                                  { this.state.cast.map((el, i) => {
                                    return (this.displayFields("cast", i) );
                                  })}
                                </div>

                                <div className="form-group">
                                  <label htmlFor="storyline">Sinopse</label>
                                  <div className="row">
                                    <div className="col-sm-11">
                                      <textarea rows="5" type="text" className="form-control" id="storyline" name="storyline" value={this.state.storyline} onChange={this.handleTextChange}></textarea>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label>Prêmios</label>
                                  { this.state.awards.map((el, i) => {
                                    return (this.displayFields("awards", i) );
                                  })}
                                </div>

                                <div className="form-group">
                                  <label>Festivais</label>
                                  { this.state.festivals.map((el, i) => {
                                    return (this.displayFields("festivals", i) );
                                  })}
                                </div>

                                <div className="form-group">
                                  <label>Críticas (URL)</label>
                                  { this.state.reviews.map((el, i) => {
                                    return (this.displayFields("reviews", i) );
                                  })}
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
                    contentLabel="Add Project"
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
export default Update;
