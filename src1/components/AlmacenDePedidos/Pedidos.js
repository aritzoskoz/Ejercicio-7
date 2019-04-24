import React, { Component } from 'react';

import axios from '../../axios';
import RefPedido from './RefPedido';
import FullPedido from './FullPedido';
import './Pedidos.css';


class Pedidos extends Component {
    state = {
        pedidos: [],
        selectedPedidoId: null
    }

    pedidoSelectedHandler = (id) => {
        this.setState({selectedPedidoId: id});
        console.log("Pedido "+id+" seleccionado");
    }

    componentDidMount () {
        
        axios.get( '/pedidos.json' )
            .then( response => {
                //console.log("se han cargado los pedidos");
                let pedidos = [];
                for (let key in response.data) {
                    pedidos.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                this.setState({pedidos: pedidos});
            } )
    }

    
    render () {

        let PedidoRef = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        PedidoRef = this.state.pedidos.map(PedidoRef => {
                return <RefPedido
                    clicked={() => this.pedidoSelectedHandler(PedidoRef.idb)} 
                    todo={PedidoRef}/>;
            });

    return (
        <div class="Cuadro">    
            <div class="row">
                <div class="col-sm-5">
                    <div class="cuadro">
                        {PedidoRef}
                    </div>
                </div>
                <div class="col-sm-7">
                    <section>
                        <FullPedido id={this.state.selectedPedidoId} />
                    </section>
                </div>
            </div>
        </div>
    )

    }

}

export default Pedidos;