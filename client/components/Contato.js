import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Info from './Info';

class Contato extends React.Component {
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
                <div className="masonry">
                    <div className="container-fluid contato">
                        <div className="row text-center">
                            <div className="col-sm-4 col-xs-8 whatsapp-box">
                            <h1>{this.state.info.phone &&
                            <a target="_blank" href={"https://api.whatsapp.com/send?phone=" + this.state.info.phone.replace(/[+-]/g, '')}><i className="fab fa-whatsapp"></i></a>
                            }</h1>
                            {this.state.info.phone}
                        </div>

                        <a target="_blank" href={this.state.info.youtube}>
                        <div className="col-sm-4 col-xs-8 youtube-box">
                            <h1><i className="fab fa-youtube"></i></h1>
                        </div>
                        </a>
                        <a href={"mailto:" + this.state.info.email + "?Subject=Contato%20Aruac"} target="_blank">
                        <div className="col-sm-4 col-xs-8 email-box">
                            <h1><span className="glyphicon glyphicon-send"></span></h1>
                            {this.state.info.email}
                        </div>
                        </a>

                        </div>
                        <br/>
                    </div>
                    <div className="container-fluid contato">
                        <div className="row text-center">
                            <div className="col-sm-2"></div>
                            <a target="_blank" href={this.state.info.instagram}>
                            <div className="col-sm-4 col-xs-8 instagram-box">
                                <h1><i className="fab fa-instagram"></i></h1>
                            </div>
                            </a>
                            <a href="https://www.facebook.com/aruacfilmes/">
                                <div className="col-sm-4 col-xs-8 facebook-box">
                                    <h1><i className="fab fa-facebook"></i></h1>
                                </div>
                            </a>

                            <div className="col-sm-2"></div>

                        </div>
                        <br/>
                    </div>
                    <div className="button-center">
                        <Info info={this.state.info} prev="con" />
                    </div>
                </div>
                );
    }
}

export default Contato;
