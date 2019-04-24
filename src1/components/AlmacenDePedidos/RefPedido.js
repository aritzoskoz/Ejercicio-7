import React, { Component } from 'react';
import './RefPedido.css';

class RefPedido extends Component {


    render() {
        return (
            <div class="Ref" onClick={this.props.clicked}>
                <h5>Pedido nº {this.props.todo.idb}</h5>
            </div>
            );
    }
}

export default RefPedido;