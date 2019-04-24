import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Confirmacion2 extends Component {

    render () {
    
    return (
        <div class="col-sm-9">
            <div><h2> MUCHAS GRACIAS POR TU PEDIDO </h2></div>
            <div><p> Se ha almacenado correctamente</p></div>
            <NavLink class="btn btn-dark" to={{ pathname:'Tienda', state: { carritoActual: [], }}}> REALIZAR OTRO PEDIDO </NavLink>
            </div>
    )

    }

}

export default Confirmacion2;