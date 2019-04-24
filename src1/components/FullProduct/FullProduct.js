import React, { Component } from 'react';
import axios from '../../axios';

import './FullProduct.css';

class FullProduct extends Component {
    state = {
        loadedProduct: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            
            if (!this.state.loadedProduct || this.state.loadedProduct.idb !== this.props.id) {
                axios.get('/productos.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    
                    .then(response => {
                        const productos = [];
                        for (let key in response.data) {
                            productos.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        
                        this.setState({ loadedProduct: productos[0] });
                    });
            }
        }
    }


    render() {
        let producto = <h5 style={{ textAlign:'center', color:'red', margin:'20px'}}>selecciona un producto para más detalle</h5>;

        if (this.props.id) {
            producto = <h5 style={{ textAlign:'center', color:'red', margin:'20px'}}>...Loading...Loading...Loading...Loading...</h5>;
        }
        
        if (this.state.loadedProduct) {
            producto = (
                <div className="FullProduct">
            
                    <h1>{this.state.loadedProduct.nombre}</h1>
		            <img src={this.state.loadedProduct.imagen} alt="imagen" class="img-fluid" width="250"/>
                    <p></p>
                    <p>DESCRIPCIÓN: {this.state.loadedProduct.descripcion}</p>
                    <p><em>PRECIO: {this.state.loadedProduct.precio} €</em></p>
                </div>

            );
        }
        return producto;
    }
}

export default FullProduct;