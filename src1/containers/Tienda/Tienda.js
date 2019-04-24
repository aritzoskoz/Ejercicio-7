import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import axios from '../../axios';

import 'bootstrap/dist/css/bootstrap.css';
import './Tienda.css';

import Producto from '../../components/Producto/Producto';
import FullProduct from '../../components/FullProduct/FullProduct';
import Carrito from '../../components/Carrito/Carrito';
//import NewProduct from '../NewProduct/NewProduct';

class Tienda extends Component {
    state = {
        productos: [],
        carritoActual: [],
        sumaTotal: 0,
        selectedProductId: null,
        error: false
    }

    //Método que se ejecuta justo después de que el componente haya sido montado en el DOM
    componentDidMount () {
        axios.get( '/productos.json' )
            .then( response => {
                let productos = [];
                for (let key in response.data) {
                    productos.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                this.setState({productos: productos});
            } )
            .catch(error => {
                this.setState({error: true});
            });

            if (this.props.location.state.carritoActual){
                this.setState({carritoActual: this.props.location.state.carritoActual});
            } 

    }


    //Método cuando se ha seleccionado un producto
    productSelectedHandler = (id) => {
        this.setState({selectedProductId: id});
    }


    //Método cuando se ha restado un producto
    restar = (idRestar) => {
        let cant=1;

        //Copio carritoActual en car
        const car = [...this.state.carritoActual];
        let Nproductos=(car.length);

            //Recorremos el carrito y restamos una unidad
             for(var e=0; e<Nproductos ;e++){
                if(idRestar===car[e][0].idb){
                    cant=car[e][0].cantidad;
                    cant--;
                    e=Nproductos+5;
                }
            }
            
            //Actualizamos la nueva cantidad
            for(var u=0; u<Nproductos ;u++){
                if(idRestar===car[u][0].idb){
                    car[u][0].cantidad=cant;
                }
            }

            //Eliminamos una unidad 
            for(var i=0; i<Nproductos ;i++){
                if(idRestar===car[i][0].idb){
                    //console.log("Producto eliminado del carrito");
                    //car.splice(i,1);
                    let A = car.slice(0,i);
                    let B = car.slice(i+1);
                    let C = A.concat(B);
                    this.setState({carritoActual: C}); //Actualizo carritoActual
                    break;
                    }
            }
        
    }

    //Método cuando se ha añadido un producto
    añadir = (idAñadir) => {
        let cant=1;
        let Nproductos = this.state.carritoActual.length;

        //Recorremos el carrito y sumamos una unidad más
        for(var i=0; i<Nproductos ;i++){
               if(idAñadir===this.state.carritoActual[i][0].idb){
                   cant=this.state.carritoActual[i][0].cantidad;
                   cant++;
                   i=Nproductos+1;
              }
        }
    
                //carga producto que quiero añadir
                axios.get('/productos.json?orderBy="$key"&equalTo="' + idAñadir + '"')
        .           then(response => {
                    const productoAñadido = [];
                        for (let key in response.data) {
                            productoAñadido.push({
                            ...response.data[key],
                            idb: key
                            });
                        }
                        //Copio carritoActual en Z
                        let Z = [...this.state.carritoActual];
                        let long=(Z.length);
                        productoAñadido[0].cantidad=cant; 
                        Z[long]=productoAñadido;
                        this.setState({carritoActual: Z}); //Actualizo carritoActual
                    });
            
            //Actualizo la nueva cantidad 
            for(var u=0; u<Nproductos ;u++){
                if(idAñadir===this.state.carritoActual[u][0].idb){
                    const A = [...this.state.carritoActual];
                    A[u][0].cantidad=cant;
                    this.setState({carritoActual: A}); //Actualizo carritoActual
                }
            }
            
    }



    sumaTotal() {
        let suma = 0;
        const Nproductos = this.state.carritoActual.length;
        for(var i=0; i<Nproductos ;i++){
            const P = this.state.carritoActual[i][0].precio;
            suma = (suma*1)+(P*1);
        }

        return suma;
    }

    render () {
        //Lo veremos si ha habido un error
        let productos = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let carrito = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        //Si no ha habido error:
        if (!this.state.error) {
            productos = this.state.productos.map(producto => {
                return <Producto 
                    key={producto.idb} 
                    nombre={producto.nombre} 
                    imagen={producto.imagen}
                    descripcion={producto.descripcion}
                    precio={producto.precio}
                    clicked={() => this.productSelectedHandler(producto.idb)}
                    clickedAñadir={() => this.añadir(producto.idb)}
                    clickedRestar={() => this.restar(producto.idb)} />;
            });
            carrito = this.state.carritoActual.map(carritoA => {
                return <Carrito 
                    key={carritoA[0].idb} 
                    nombre={carritoA[0].nombre} 
                    imagen={carritoA[0].imagen}
                    descripcion={carritoA[0].descripcion}
                    precio={carritoA[0].precio}
                    cantidad={carritoA[0].cantidad}/>;
            });

        }
        
        console.log(this.state.carritoActual);
        return (
          <div class="Completo">
          <div class="row">
            <div class="col-sm-8">
                <div><h2> PRODUCTOS </h2></div>
                <section className="carrito">
                    {productos}
                </section>
                <div><h2> DETALLES DEL PRODUCTO </h2></div>
                <section>
                    <FullProduct id={this.state.selectedProductId} />
                </section>
            </div> 
            <div class="col-sm-4">
                <div><h3> CARRITO </h3></div>
                <div>
                    <section className="Carrito">
                        {carrito}
                    </section>
                    <div>
                        <h5>PRECIO TOTAL: {this.sumaTotal()} €</h5>
                        <NavLink class="btn btn-primary" to={{ pathname:'confirmacion', state: { carritoActual: this.state.carritoActual, sumaTotal: this.sumaTotal() }}}>REALIZAR PEDIDO</NavLink>
                    </div>
                </div>
            </div>    
          </div>

                {/* SECCIÓN 3 sólo para añadir productos a Firebase. ADMINISTRATOR  */}
                {/*    <div><h1> SECCIÓN 3 - ADD A NEW PRODUCT </h1></div>
                    <section>
                    <NewProduct/>
                    </section> */}
          </div>
        );
    }
}

export default Tienda;