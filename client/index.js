import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, hashHistory } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import Produtora from './components/Produtora';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Route path="/produtora" component={Produtora} />
            <Route exact path="/" component={Home} />
        </App>
    </BrowserRouter>,
  document.getElementById('root')
);
