import React from 'react';
import { Link, IndexLink } from 'react-router-dom';

class App extends React.Component {

    render() {
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
                        <a href="https://www.facebook.com/aruacfilmes/"><i className="fa fa-facebook"></i>@aruacfilmes</a>
                        <a><i className="fa fa-phone"></i>+55-21-99279-5004</a>
                        <a href="mailto:aruacfilmes@gmail.com?Subject=Contato%20Aruac"><i className="fa fa-envelope"></i>aruacfilmes@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </footer>
            </div>
        )
    }
}

export default App;
