import React, { Component } from 'react';

import './Producto.css';

class producto extends Component {

render () {
    return (
        <div>
            <div className="Producto"  onClick={this.props.clicked} >
                <h2>{this.props.nombre}</h2>
                <div><img src={this.props.imagen} alt="imagen" class="img-fluid" width="100"/></div>
                <p class="mt-1"> PRECIO: {this.props.precio} €</p>
                <button class="btn btn-success" onClick={this.props.clickedAñadir}> AÑADIR  +</button>
                <button class="btn btn-danger ml-1"  onClick={this.props.clickedRestar}>ELIMINAR -</button>
            </div>
        </div>
        );
    }
}

export default producto;