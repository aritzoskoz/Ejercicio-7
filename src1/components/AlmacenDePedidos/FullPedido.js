import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';

import Carrito from '../Carrito/Carrito';

import './FullPedido.css';

class FullPedido extends Component {
    state = {
        loadedPedido: null
    }

    componentWillReceiveProps(){
        this.setState({ loadedPedido: null })
    ;}

    componentDidUpdate() {
        if (this.props.id) {
                axios.get('/pedidos.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    .then(response => {
                        const ZZZ = [];
                        for (let key in response.data) {
                            ZZZ.push({
                                ...response.data[key],
                                idb: key
                            });
                        } 
                        this.setState({ loadedPedido: ZZZ[0] });
                    });
        }
    }
 


    render() {
        let infoPedido = <h3 style={{ textAlign:'center', color:'red'}}>Selecciona un Pedido para más detalles</h3>;
        let carrito = <h3 style={{ textAlign:'center', color:'red'}}>Selecciona un Pedido para más detalles</h3>;
        
        if (this.state.loadedPedido) {

            carrito = this.state.loadedPedido.productos.map(carritoA => {
                return <Carrito 
                    key={this.props.id} 
                    nombre={carritoA[0].nombre} 
                    imagen={carritoA[0].imagen}
                    descripcion={carritoA[0].descripcion}
                    precio={carritoA[0].precio}
                    cantidad={carritoA[0].cantidad}/>;
            });

            infoPedido = (
                <div className="FullPedido">
                    <dt><p class="text-primary">[ PEDIDO {this.props.id} ]</p></dt>
                    <p>NOMBRE <kbd>{this.state.loadedPedido.nombre}</kbd> </p>
                    <p>DIRECCIÓN <kbd>{this.state.loadedPedido.direccion}</kbd> </p>
                    <p>PRECIO <kbd>{this.state.loadedPedido.sumaTotal} €</kbd></p>

                    <section className="Productos"> {carrito} </section>
                                        
                    <NavLink  class="btn btn-success mr-1 mt-2" to={{ pathname:'Tienda', state: { carritoActual: this.state.loadedPedido.productos}}}>
                        CARGAR PEDIDO
                    </NavLink>
                    <NavLink  class="btn btn-danger ml-1 mt-2" to={{ pathname:'borrar', state: { loadedPedido: this.state.loadedPedido }}}>
                        BORRAR PEDIDO
                    </NavLink>
                </div>
            );
        }
        return infoPedido;
    }
}

export default FullPedido;