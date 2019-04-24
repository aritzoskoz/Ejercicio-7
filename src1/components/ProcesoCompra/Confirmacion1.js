import React, { Component } from 'react';
import axios from '../../axios';

import './Confirmacion1.css';



class Confirmacion1 extends Component {
    state = {
        nombre: '',
        direccion: ''
    }

    
    productDataHandler = () => {
        let data =[];
        data = {
            nombre: this.state.nombre,
            direccion: this.state.direccion
        };
        data['productos']=this.props.location.state.carritoActual;
        data['sumaTotal']=this.props.location.state.sumaTotal;
        axios.post('/pedidos.json', data)
            .then(response => {
                window.location="/Confirmacion2";
            }).catch(error => {
                alert('Error order');
            });
    }

    render () {
    
        let carrito = <p> </p>;

    return (
        <div class="col-sm-9">
            <div><h2> ESTÁS A UN PASO DE CERTIFICAR TU PEDIDO </h2></div>
            <div>
                <div class="Confirmacion1">
                
                <label>Nombre</label>
                <input type="text" value={this.state.nombre} onChange={(event) => this.setState({nombre: event.target.value})} />
                
                <label>Dirección de envío</label>
                <textarea rows="3" value={this.state.direccion} onChange={(event) => this.setState({direccion: event.target.value})} />
                
                <button onClick={this.productDataHandler}>REALIZAR PEDIDO</button>
                </div>
            </div>
                {carrito}
          </div>
    )

    }

}


export default Confirmacion1;