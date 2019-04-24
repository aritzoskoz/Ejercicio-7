import React, { Component } from 'react';

import './Carrito.css';

class Carrito extends Component {

render () {
    //console.log(this.props.nombre);
    return (
        <div>
            <div className="CarritoStyle" >
                <p>{this.props.nombre}</p>
                <img src={this.props.imagen} alt="imagen" class="img-fluid" width="60"/>
                <p>CANTIDAD: {this.props.cantidad}</p>
            </div>
        </div>
        );
    }
}

export default Carrito;