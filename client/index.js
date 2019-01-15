import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, hashHistory } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import Produtora from './components/Produtora';
import Diretores from './components/Diretores';
import Contato from './components/Contato';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Route path="/contato" component={Contato} />
            <Route path="/diretores" component={Diretores} />
            <Route path="/produtora" component={Produtora} />
            <Route exact path="/" component={Home} />
        </App>
    </BrowserRouter>,
  document.getElementById('root')
);
