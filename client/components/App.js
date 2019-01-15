import React from 'react';
import { Link, IndexLink } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
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
        console.log("app");
        console.log(this.state.info);
        return (
            <div>
                {/* NAVBAR */}
                <a href="#" className="btn-menu collapse" id="toggle"><span/></a>
                <div className="hidden-nav">
                  <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <ul className="nav navbar-nav">
                        <li><Link to="/">ARUAC</Link></li>
                        <li><Link to="/produtora">PRODUTORA</Link></li>
                        <li><Link to="/diretores">DIRETORES</Link></li>
                        <li><Link to="/contato">CONTATO</Link></li>
                        {/*<li><span className="lang-sm" lang="en"></span></li>*/}
                      </ul>
                    </div>
                  </nav>
                </div>
                {/* MAIN */}
                <div className="main">
                    {this.props.children}
                </div>
                {/* FOOTER */}
                <footer className="footer-distributed">
                  <div className="footer-left">
                    <div className="footer-links text-footer">
                      <Link to="/">ARUAC</Link>
                      <Link to="/produtora">PRODUTORA</Link>
                      <Link to="/diretores">DIRETORES</Link>
                      <Link to="/contato">CONTATO</Link>
                      {/*<span className="lang-sm" lang="en"></span>*/}
                      <br/><hr/>
                      <div className="footer-icons">

                          <a target="_blank" href={this.state.info.youtube}><i className="fab fa-youtube"></i></a>
                          <a target="_blank" href={this.state.info.instagram}><i className="fab fa-instagram"></i></a>
                          <a target="_blank" href={this.state.info.facebook}><i className="fab fa-facebook-f"></i></a>
                          {this.state.info.phone &&
                          <a target="_blank" href={"https://api.whatsapp.com/send?phone=" + this.state.info.phone.replace(/[+-]/g, '')}><i className="fab fa-whatsapp"></i></a>
                          }
                          <a target="_blank" href={"mailto:" + this.state.info.email + "?Subject=Contato%20Aruac"}><i className="fa fa-envelope"></i></a>

                      </div>
                    </div>
                  </div>
                </footer>
            </div>
        )
    }
}

export default App;
