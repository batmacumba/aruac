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
                <div className="contato">
                    <ul>
                            {this.state.info.phone &&
                                <li>
                                    <div className="whatsapp-box">
                                        <a target="_blank" href={"https://api.whatsapp.com/send?phone=" + this.state.info.phone.replace(/[+-]/g, '')}><i className="fab fa-whatsapp"></i></a>
                                        <br/><div className="text-contato">{this.state.info.phone}</div>
                                    </div>
                                </li>
                            }
                            {this.state.info.youtube &&
                                <li>
                                    <div className="youtube-box">
                                        <a target="_blank" href={this.state.info.youtube}>
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </div>
                                </li>
                            }
                            {this.state.info.email &&
                                <li>
                                    <div className="email-box">
                                        <a href={"mailto:" + this.state.info.email + "?Subject=Contato%20Aruac"} target="_blank">
                                            <i className="far fa-envelope"></i>
                                        </a>
                                        <br/><div className="text-contato"></div>
                                    </div>
                                </li>
                            }
                            {this.state.info.instagram &&
                                            <li>
                                                <div className="instagram-box">
                                                    <a target="_blank" href={this.state.info.instagram}>
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </div>
                                            </li>
                            }
                            {this.state.info.facebook &&
                                            <li>
                                                <div className="facebook-box">
                                                    <a target="_blank" href={this.state.info.facebook}>
                                                        <i className="fab fa-facebook"></i>
                                                    </a>
                                                </div>
                                            </li>
                            }
                    </ul>
                    {this.props.isLogged &&
                        <div className="button-center">
                            <Info info={this.state.info} token={this.props.token} prev="con" />
                        </div>
                    }
                </div>
                );
    }
}

export default Contato;
