import React from 'react';
import { Link, IndexLink, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Produtora from './Produtora';
import Diretores from './Diretores';
import Contato from './Contato';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Admin from './Admin';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            info: [],
            lang: 'pt',
            isLogged: false,
            token: ''
        };
        this.getInfo = this.getInfo.bind(this);
        this.getCredential = this.getCredential.bind(this);
        this.changeLang = this.changeLang.bind(this);
    }
    componentDidMount() {
        this.getInfo(this);
        this.getCredential(this);
    }

    getInfo(ev){
        axios.get('/getInfo')
        .then(function(response) {
            ev.setState({info: response.data});
        });
    }
    
    getCredential(ev){
        var localToken = localStorage.getItem('aruacToken');
        if (!localToken) return;
        
        const data = new FormData();
        data.append('token', localToken);
        axios.post('/checkUser', data)
        .then(function(response) {
              if (response.data == true) ev.setState({ isLogged: true,
                                                       token: localToken
                                                     });
              else if (response.data == 'expired') localStorage.removeItem('aruacToken');
              else ev.setState({ isLogged: false,
                                 token: ''
                               });
        });
    }

    changeLang () {
        if (this.state.lang == 'pt')
            this.setState({
                lang: 'en'
            });
        else if (this.state.lang == 'en')
            this.setState({
                lang: 'pt'
            });
    }

    render() {
        return (
            <div>

                {/* NAVBAR */}
                <div id="toggle">
                    {/* LANGUAGE ICONS */}
                    { this.state.lang == 'pt' &&
                        <a href="javascript:void(0);" onClick={this.changeLang.bind(this)}>
                            <img src="/img/en.png" className="lang" id="en"/>
                        </a>
                    }
                    { this.state.lang == 'en' &&
                        <a href="javascript:void(0);" onClick={this.changeLang.bind(this)}>
                            <img src="/img/pt-br.png" className="lang" id="pt"/>
                        </a>
                    }

                    <a href="#" className="btn-menu collapse"><span/></a>
                </div>
                <div className="hidden-nav esconde-nav">
                  <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      { this.state.lang == 'pt' &&
                          <ul className="nav navbar-nav">
                            <li><Link to="/">ARUAC</Link></li>
                            <li><Link to="/produtora">PRODUTORA</Link></li>
                            <li><Link to="/diretores">DIRETORES</Link></li>
                            <li><Link to="/contato">CONTATO</Link></li>
                          </ul>
                      }
                      { this.state.lang == 'en' &&
                          <ul className="nav navbar-nav">
                            <li><Link to="/">ARUAC</Link></li>
                            <li><Link to="/produtora">ABOUT</Link></li>
                            <li><Link to="/diretores">DIRECTORS</Link></li>
                            <li><Link to="/contato">CONTACT</Link></li>
                          </ul>
                      }
                    </div>
                  </nav>
                </div>

                {/* MAIN */}
                <div className="main">
                    <Switch>
                        <Route path="/logar"     render={(props) => ( <LogIn lang={this.state.lang}
                                                                             isLogged={this.state.isLogged}
                                                                             token={this.state.token}/> )} />
                        <Route path="/cadastrar" render={(props) => ( <SignUp lang={this.state.lang}
                                                                              isLogged={this.state.isLogged}
                                                                              token={this.state.token}/> )} />
                        <Route path="/admin" render={(props) => ( <Admin lang={this.state.lang}
                                                                     isLogged={this.state.isLogged}
                                                                     token={this.state.token}/> )} />
                        <Route path="/contato"   render={(props) => ( <Contato lang={this.state.lang}
                                                                               isLogged={this.state.isLogged}
                                                                               token={this.state.token}/> )} />
                        <Route path="/diretores" render={(props) => ( <Diretores lang={this.state.lang}
                                                                                 isLogged={this.state.isLogged}
                                                                                 token={this.state.token}/> )} />
                        <Route path="/produtora" render={(props) => ( <Produtora lang={this.state.lang}
                                                                                 isLogged={this.state.isLogged}
                                                                                 token={this.state.token}/> )} />
                        <Route exact path="/"    render={(props) => ( <Home lang={this.state.lang}
                                                                            isLogged={this.state.isLogged}
                                                                            token={this.state.token}/> )} />
                    </Switch>
                </div>
                {/* FOOTER */}
                <footer className="footer-distributed">
                  <div className="footer-left">
                    <div className="footer-links text-footer">
                    { this.state.lang == 'pt' &&
                        <span>
                            <Link to="/">ARUAC</Link>
                            <Link to="/produtora">PRODUTORA</Link>
                            <Link to="/diretores">DIRETORES</Link>
                            <Link to="/contato">CONTATO</Link>
                        </span>
                    }
                    { this.state.lang == 'en' &&
                        <span>
                            <Link to="/">ARUAC</Link>
                            <Link to="/produtora">ABOUT</Link>
                            <Link to="/diretores">DIRECTORS</Link>
                            <Link to="/contato">CONTACT</Link>
                        </span>
                    }

                      <br/><hr/>
                      <div className="footer-icons">

                          <a target="_blank" href={this.state.info.youtube}><i className="fab fa-youtube"></i></a>
                          <a target="_blank" href={this.state.info.instagram}><i className="fab fa-instagram"></i></a>
                          <a target="_blank" href={this.state.info.facebook}><i className="fab fa-facebook-f"></i></a>
                          {this.state.info.phone &&
                          <a target="_blank" href={"https://api.whatsapp.com/send?phone=" + this.state.info.phone.replace(/[+-]/g, '')}><i className="fab fa-whatsapp"></i></a>
                          }
                          <a target="_blank" href={"mailto:" + this.state.info.email + "?Subject=Contato%20Aruac"}><i className="fa fa-envelope"></i></a>
                          <Link to="/admin"><i className="fas fa-sign-in-alt"></i></Link>

                      </div>
                    </div>
                  </div>
                </footer>
            </div>
        )
    }
}

export default App;
