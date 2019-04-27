import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Info from './Info';

class Produtora extends React.Component {
    constructor() {
        super();
        this.state = {info: []};
        this.getInfo = this.getInfo.bind(this);
    }
    componentDidMount() {
        this.getInfo(this);
    }

    getInfo(ev){
        axios.get('/getInfo')
        .then(function(response) {
            ev.setState({info: response.data});
        });
    }

    render() {
        return (
                <div>
                    <div className="container-fluid masonry">
                        <div className="row">
                            <div className="col-md-6 text-menu">
                            {this.state.info.story &&
                             this.props.lang == 'pt' &&
                             this.state.info.story.split('\n').map(function(line, i) {
                              return (
                                <div key={line + i}>
                                  {line}
                                  <br/>
                                </div>
                              )
                              })}
                            {this.state.info.story_en &&
                             this.props.lang == 'en' &&
                             this.state.info.story_en.split('\n').map(function(line, i) {
                                return (
                                  <div key={line + i}>
                                    {line}
                                    <br/>
                                  </div>
                                )
                            })}
                            </div>
                            <div className="col-md-6">
                                <img className="img-responsive cartazes" src="./img/cartazes/campo_de_jogo.jpg"/>
                                <img className="img-responsive cartazes" src="./img/cartazes/cinema_novo.jpg"/><br/>
                                <img className="img-responsive cartazes" src="./img/cartazes/exilados.jpg"/>
                                <img className="img-responsive cartazes" src="./img/cartazes/rocha_que_voa.jpg"/>
                            </div>
                        </div>
                    </div>
                    {this.props.isLogged &&
                        <div className="button-center">
                            <Info info={this.state.info} prev="prod" token={this.props.token}/>
                        </div>
                    }
                </div>
                );
    }
}

export default Produtora;
