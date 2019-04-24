import React, { Component } from 'react';

import './Post.css';

class post extends Component {

render () {
    return (
        <div>
            <div className="Post"  onClick={this.props.clicked} >
                <h2>{this.props.nombre}</h2>
                <img src={this.props.imagen} alt="imagen" class="img-fluid" width="100"/>
            </div>
            
            <div className="Botones">
                <button className="button" onClick={this.props.clickedAñadir}>AÑADIR +</button>
                <button className="button" onClick={this.props.clickedRestar}>ELIMINAR -</button>
            </div>
        </div>
        );
    }
}

export default post;