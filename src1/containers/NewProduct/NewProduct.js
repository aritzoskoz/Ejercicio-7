import React, { Component } from 'react';

import axios from '../../axios';

import './NewProduct.css';

class NewProduct extends Component {
    state = {
        nombre: '',
        imagen: '',
        descripcion: '',
        precio: ''
    }

    productDataHandler = () => {
        const data = {
            nombre: this.state.nombre,
            imagen: this.state.imagen,
            descripcion: this.state.descripcion,
            precio: this.state.precio
        };
        axios.post('/productos.json', data)
            .then(response => {
                alert('Saved order');
                //console.log(response);
            }).catch(error => {
                // console.log(error);
                // this.setState({error: true});
                alert('Error order');
            });
    }

    render () {
        return (
            <div className="NewProduct">
                <h1>Add a Product</h1>
                
                <label>Nombre</label>
                <input type="text" value={this.state.nombre} onChange={(event) => this.setState({nombre: event.target.value})} />
                
                <label>Descripción</label>
                <textarea rows="3" value={this.state.descripcion} onChange={(event) => this.setState({descripcion: event.target.value})} />
                
                <label>Precio</label>
                <input type="text" value={this.state.precio} onChange={(event) => this.setState({precio: event.target.value})} />
                
                <label>URL Imagen</label>
                <input type="text" value={this.state.imagen} onChange={(event) => this.setState({imagen: event.target.value})} />
                
                <button onClick={this.productDataHandler}>ADD</button>
            </div>
        );
    }
}

export default NewProduct;