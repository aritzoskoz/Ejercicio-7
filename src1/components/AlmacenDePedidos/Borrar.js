import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';


class Borrar extends Component {
    state = {
        loadedPedido: ''
    }
    
    borrarPedido = () => {
        console.log("Has entrado en borrarPedido(). "+this.props.location.state.loadedPedido.idb);
        axios.delete('/pedidos/' +this.props.location.state.loadedPedido.idb + '.json')
            .then(response => {
                alert('Pedido con referencia '+ this.props.location.state.loadedPedido.idb +' eliminado.');
            });
    }

    render () {
    
    return (
        <div class="col-sm-9">
            <div><h2> ¿SEGURO QUE QUIERES BORRAR TU PEDIDO? </h2></div>
            <div>
                <NavLink  class="btn btn-success mr-2" to={{ pathname:'Tienda', state: { loadedPedido: [] }}}>CONSERVAR PEDIDO</NavLink>
                <button class="btn btn-danger" onClick={this.borrarPedido}>BORRAR PEDIDO</button>
            </div>
          </div>
    )
    }

}

export default Borrar;