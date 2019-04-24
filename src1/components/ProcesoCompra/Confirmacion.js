import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Confirmacion1.css';

import Carrito from '../Carrito/Carrito';


class Confirmacion extends Component {

    
    render () {
        //console.log(this.props.location.state.sumaTotal);
        let carritoActual=(this.props.location.state.carritoActual);
        let sumaTotal=(this.props.location.state.sumaTotal);
        let carrito = <p> </p>;

        carrito = carritoActual.map(carritoA => {
            return <Carrito 
                key={carritoA[0].idb} 
                nombre={carritoA[0].nombre} 
                imagen={carritoA[0].imagen}
                descripcion={carritoA[0].descripcion}
                precio={carritoA[0].precio}
                cantidad={carritoA[0].cantidad}/>;
        });

    return (
        <div class="col-sm-9">
            <div><h2> RESUMEN PEDIDO </h2></div>
            <section className="carrito">
                {carrito}
            </section>
            <div><h5>PRECIO TOTAL: {+sumaTotal} €</h5></div>
            <div className="carrito">
                <NavLink  class="btn btn-danger mr-1 mt-2" to={{ pathname:'Tienda', state: { carritoActual: [], }}}> VOLVER AL INICIO</NavLink>
                <NavLink  class="btn btn-success ml-1 mt-2" to={{ pathname:'confirmacion1', state: { carritoActual: carritoActual, sumaTotal: this.props.location.state.sumaTotal }}}>REALIZAR PEDIDO</NavLink>
            </div>
            
        </div>
    )
    }
}

export default Confirmacion;