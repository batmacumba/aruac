//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
// import Diretores from './components/diretores';
// import Contato from './components/contato';
// <Route path='/produtora' component={Produtora} />
// <Route path='/diretores' component={Diretores} />
// <Route path='/contato' component={Contato} />

export const Routes = () => (
                             <Switch>
                                 <Route path='/' component={Home} />
                             </Switch>
                             );
export default Routes;
