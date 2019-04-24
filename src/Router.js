import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Tienda from './containers/Tienda/Tienda';
import Pedidos from './components/Pedidos/Pedidos';

const Router = () => (
    <Switch>
        <Route exact path='/' component={Tienda} />
        <Route exact path='/Pedidos' component={Pedidos} />
    </Switch>
)

export default Router