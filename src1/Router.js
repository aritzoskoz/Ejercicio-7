import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Bienvenid from './containers/Bienvenid/Bienvenid';
import Tienda from './containers/Tienda/Tienda';

import Pedidos from './components/AlmacenDePedidos/Pedidos';
import FullPedido from './components/AlmacenDePedidos/FullPedido';
import Borrar from './components/AlmacenDePedidos/Borrar';

import Confirmacion from './components/ProcesoCompra/Confirmacion';
import Confirmacion1 from './components/ProcesoCompra/Confirmacion1';
import Confirmacion2 from './components/ProcesoCompra/Confirmacion2';

const Router = () => (
    <Switch>
        <Route exact path='/' component={Bienvenid} />
        <Route exact path='/Tienda' component={Tienda} />
        <Route exact path='/Pedidos' component={Pedidos} />
        <Route exact path='/FullPedido' component={FullPedido} />
        <Route exact path='/Borrar' component={Borrar} />
        <Route exact path='/Confirmacion' component={Confirmacion} />
        <Route exact path='/Confirmacion1' component={Confirmacion1} />
        <Route exact path='/Confirmacion2' component={Confirmacion2} />
    </Switch>
)

export default Router