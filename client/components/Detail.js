//client/components/Detail.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import Update from './Update';
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)';

var querystring = require('querystring');

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            updateIsOpen: false,
            messageFromServer: ''
        }
        this.openUpdate = this.openUpdate.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.displayDirector = this.displayDirector.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
    }

    componentDidMount() {
        this.props.project.crew.reverse();
        this.props.project.crew_en.reverse();
    }

    openUpdate() {
        this.setState({
          modalIsOpen: false,
          updateIsOpen: true
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
    * deleteProject - asks server to delete the currently open project
    */
    deleteProject(e) {
      const data = new FormData();
      data.append('_id', this.props.project._id)
      data.append('title', this.props.project.title)
      axios.post('/delete', data)
        .then(function(response) {
          e.setState({
            messageFromServer: response.data
          });
      });
    }

    /**
    * displayCrew - returns formatted role and name
    * @obj: given object
    * @i: index of the wanted member
    */
    displayCrew(obj, i) {
        if (obj == null) return;
        var nameFormatted = obj.name.toUpperCase();
        var strFormatted = obj.role + ' ' + nameFormatted;
        return (
            <div key={strFormatted + i}>
                {strFormatted} <br/>
            </div>
        );
    }

    /**
    * displayDirector - returns formatted directors names
    * @names: given string array
    * @i: index of the wanted director
    */
    displayDirector(name, i) {
      if (name == '')
        ;
      else if (i == this.props.project.director.length - 2) {
        if (this.props.lang == 'pt') return (name + ' e ');
        else if (this.props.lang == 'en') return (name + ' and ');
      }
      else if (i == this.props.project.director.length - 1)
        return (name);
      else
        return (name + ', ');
    }

    /**
    * displayAwards - returns formatted awards names
    * @award: given string
    */
    displayAwards(award) {
      return(
        <li key={award}>{award}</li>
      );
    }

    /**
    * displayFestivals - returns formatted festivals names
    * @festival: given string
    */
    displayFestivals(festival) {
      return(
        <li key={festival}>{festival}</li>
      );
    }

    /**
    * displayCast - returns formatted cast
    * @ name: string received
    * @i: index
    */
    displayCast(name, i) {
      if (name == '')
        ;
      else if (i == this.props.project.cast.length - 2) {
          if (this.props.lang == 'pt') return (name.toUpperCase() + ' e ');
          else if (this.props.lang == 'en') return (name.toUpperCase() + ' and ');
      }
      else if (i == this.props.project.cast.length - 1)
        return (name.toUpperCase());
      else
        return (name.toUpperCase() + ', ');
    }

    /**
    * displayReviews - returns formatted reviews
    * @url: given string
    */
    displayReviews(url) {
      return(
        <li key={url}>{url}</li>
      );
    }

    renderVideo(item) {
      return (
        <div className='image-gallery-image lightbox'>
              <div className='video-wrapper'>
                  <iframe
                    width='560'
                    height='315'
                    src={item.embedUrl}
                    frameBorder='0'
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  >
                  </iframe>
              </div>
        </div>
        );
    }

    render() {
      if (this.state.messageFromServer == '') {
        /* parse das imagens */
        const images = [];
        for (var i = 0; i < this.props.project.stills.length; i++) {
          images[i] = {
            original: this.props.project.stills[i],
            thumbnail: this.props.project.stills[i]
          };
        }
        /* parse do trailer */
        if (this.props.project.trailer) {
          images.unshift({
            thumbnail: './client/public/img/video-play.png',
            original: './client/public/img/video-play-original.png',
            embedUrl: this.props.project.trailer,
            renderItem: this.renderVideo.bind(this)
          });
        }

        return (
          <div key={this.props.project._id}>

            {/* THUMBNAIL */}
            <div className={"icone " + this.props.project.category} onClick={this.openModal}>
              <img src={this.props.project.thumbnail} />
              <div className="overlay-bg"></div>
              <div className="overlay-text">
                <h3>{this.props.lang == 'pt' && this.props.project.title}
                    {this.props.lang == 'en' && this.props.project.title_en}</h3><hr/>
                { this.props.project.director.map((name, i) => {
                  return (this.displayDirector(name, i));
                })} <br/>
                {this.props.project.year}<br/>
              </div>
            </div>

            {/* UPDATE MODAL */}
            { this.state.updateIsOpen && <Update project={this.props.project} key={'update ' + this.props.project._id} detail={this}/> }

            {/* DETAIL MODAL */}
            <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Project"
            className="Modal"
            style={ {overlay: {zIndex: 10}} }>
              <div className="frame">
                <button type="button" className="close" aria-hidden="true" onClick={this.closeModal}>&times;</button>
                <h4 className="modal-title text-modal-title">{this.props.lang == 'pt' && this.props.project.title}
                    {this.props.lang == 'en' && this.props.project.title_en}</h4>

                {/* CAROUSEL */}
                { images.length > 0 &&
                  <div>
                    <div className="lightbox">
                      <ImageGallery
                      items={images}
                      showPlayButton={false}
                      showNav={false}
                      additionalClass="image-gallery"
                      showFullscreenButton={false}/>
                    </div>
                    <hr/>
                  </div>
                }

                {/* CRÉDITOS */}
                <div className="row text-modal">
                  <div className="col-md-3 text-cred">
                    {this.props.project.genre &&
                     this.props.lang == 'pt' &&
                        this.props.project.genre + ' | '}
                    {this.props.project.genre &&
                     this.props.lang == 'en' &&
                        this.props.project.genre_en + ' | '}
                    {this.props.project.duration &&
                        this.props.project.duration + ' | '}
                    {this.props.project.country[0].length > 0 &&
                     this.props.lang == 'pt' &&
                        this.props.project.country[0].toUpperCase() + ' | '}
                    {this.props.project.country_en[0].length > 0 &&
                     this.props.lang == 'en' &&
                        this.props.project.country_en[0].toUpperCase() + ' | '}
                    {this.props.project.year &&
                        this.props.project.year} <br/><br/>

                    {/* EQUIPE */}
                    { this.props.lang == 'pt' && this.props.project.crew.map((obj, i) => {
                      return (this.displayCrew(obj, i));
                    })}

                    { this.props.lang == 'en' && this.props.project.crew_en.map((obj, i) => {
                      return (this.displayCrew(obj, i));
                    })}

                    <br/>

                    {/* ELENCO */}
                    {this.props.project.cast[0].length > 0 &&
                      <div>
                        { this.props.lang == 'pt' && <div>com&nbsp;</div> }
                        { this.props.lang == 'en' && <div>with&nbsp;</div> }
                        { this.props.project.cast.map((name, i) => {
                          return (this.displayCast(name, i));
                        })}
                      </div>
                    }
                   <br/>
                  </div>

                  <div className="col-md-9">
                  {/* SINOPSE */}
                  {this.props.lang == 'pt' &&
                   this.props.project.storyline &&
                      <div>
                        <div className="text-modal-subtitle">
                          Sinopse
                          <hr/>
                        </div>
                        {this.props.project.storyline.split('\n').map(function(line, i) {
                          return (
                            <div key={line + i}>
                              {line}
                              <br/>
                            </div>
                          )
                          })}
                      </div>
                  }

                  {this.props.lang == 'en' &&
                   this.props.project.storyline_en &&
                      <div>
                        <div className="text-modal-subtitle">
                          Storyline
                          <hr/>
                        </div>
                        {this.props.project.storyline_en.split('\n').map(function(line, i) {
                          return (
                            <div key={line + i}>
                              {line}
                              <br/>
                            </div>
                          )
                          })}
                      </div>
                  }

                    {/* PRÊMIOS */}
                    {this.props.lang == 'pt' &&
                     this.props.project.awards[0].length > 0 &&
                      <div>
                        <div className="text-modal-subtitle">
                          <hr/>
                          Prêmios
                          <hr/>
                        </div>
                        <ul>
                        { this.props.project.awards.map((award) => {
                          return (this.displayAwards(award));
                        })}
                        </ul>
                      </div>
                    }

                    {this.props.lang == 'en' &&
                     this.props.project.awards_en[0].length > 0 &&
                      <div>
                        <div className="text-modal-subtitle">
                          <hr/>
                          Awards
                          <hr/>
                        </div>
                        <ul>
                        { this.props.project.awards_en.map((award) => {
                          return (this.displayAwards(award));
                        })}
                        </ul>
                      </div>
                    }

                    {/* PARTICIPAÇÕES */}
                    {this.props.lang == 'pt' &&
                     this.props.project.festivals[0].length > 0 &&
                      <div>
                        <div className="text-modal-subtitle">
                          <hr/>
                          Participações
                          <hr/>
                        </div>
                        <ul>
                        { this.props.project.festivals.map((festival) => {
                          return (this.displayFestivals(festival));
                        })}
                        </ul>
                      </div>
                    }

                    {this.props.lang == 'en' &&
                     this.props.project.festivals_en[0].length > 0 &&
                      <div>
                        <div className="text-modal-subtitle">
                          <hr/>
                          Appearances
                          <hr/>
                        </div>
                        <ul>
                        { this.props.project.festivals_en.map((festival) => {
                          return (this.displayFestivals(festival));
                        })}
                        </ul>
                      </div>
                    }

                    {/* CRÍTICAS */}
                    {this.props.lang == 'pt' &&
                     this.props.project.reviews[0].length > 0 &&
                      <div>
                        <div className="text-modal-subtitle">
                          <hr/>
                          Críticas
                          <hr/>
                        </div>
                        <ul>
                        { this.props.project.reviews.map((url) => {
                          return (this.displayReviews(url));
                        })}
                        </ul>
                      </div>
                    }

                    {this.props.lang == 'en' &&
                     this.props.project.reviews_en[0].length > 0 &&
                      <div>
                        <div className="text-modal-subtitle">
                          <hr/>
                          Reviews
                          <hr/>
                        </div>
                        <ul>
                        { this.props.project.reviews_en.map((url) => {
                          return (this.displayReviews(url));
                        })}
                        </ul>
                      </div>
                    }

                    <hr/>
                    {this.props.isLogged &&
                        <div>
                            <a href="javascript:void(0);" onClick={this.openUpdate}><i className="fa fa-2x fa-pen">&nbsp;Editar</i></a>
                            <a href="javascript:void(0);" onClick={this.deleteProject.bind(this, this)}><i className="fa fa-2x fa-trash">&nbsp;Deletar</i></a>
                        </div>
                    }

                  </div>
                </div>
              </div>

            </Modal>
          </div>
        )
      }
      else {
          return (
            <div key={this.props.project._id}>
            {/* THUMBNAIL */}
              <div className="grid-item loadslider cinema" onClick={this.openModal}>
                <img src={this.props.project.stills[0]} />
                <div className="cinema-overlay-bg"></div>
                <div className="overlay-text">
                  <h3>{this.props.project.title}</h3><hr/>
                  { this.props.project.director.map((name, i) => {
                    return (this.displayDirector(name, i));
                  })} <br/>
                  {this.props.project.year}<br/>
                </div>
              </div>
              {/* AVISO DE SUCESSO */}
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
    };
}

export default Detail;
