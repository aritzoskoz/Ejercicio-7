import React, { Component } from 'react';

import axios from '../../axios';

import 'bootstrap/dist/css/bootstrap.css';
import './Tienda.css';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import PostCarrito from '../../components/PostCarrito/PostCarrito';
//import NewPost from '../../components/NewPost/NewPost';


class Tienda extends Component {
    state = {
        posts: [],
        carritoActual: [],
        precioTotal: 0,
        selectedPostId: null,
        error: false
    }

    //Método que se ejecuta justo después de que el componente haya sido montado en el DOM
    //Por ello es perfecto para integrar librerias de terceros (plugins jquery), peticiones ajax
    //o establecer algún timer de tipo setTimeout ó setInterval...
    componentDidMount () {
        //carga posts
        axios.get( '/posts.json' )
            .then( response => {
                console.log("se han cargado los posts");
                let posts = [];
                for (let key in response.data) {
                    posts.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                this.setState({posts: posts});
            } )
            .catch(error => {
                this.setState({error: true});
            });
    }

    //Método cuando se ha seleccionado un post
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }


    //Método cuando se ha añadido un producto
    añadir = (idAñadir) => {
        const Nproductos = this.state.carritoActual.length;

        //Compruebo la cantidad de ese producto en el carrito
        for(var i=0; i<Nproductos ;i++){
            
            if(idAñadir===this.state.carritoActual[i][0].idb){
                console.log("Ya has seleccionado este producto. Añadimos una unidad más.");
                //Copio carritoActual en X
                const X = [...this.state.carritoActual];
                X[i][0].cantidad++;
                this.setState({ carritoActual: X });
                i=Nproductos+5;
            }
        }
        
        if(i!==(Nproductos+6)){
            console.log("Gracias por seleccionar nuesto producto");
                //carga producto que quiero añadir
                axios.get('/posts.json?orderBy="$key"&equalTo="' + idAñadir + '"')
        .           then(response => {
                    const postAñadido = [];
                        for (let key in response.data) {
                            postAñadido.push({
                            ...response.data[key],
                            idb: key
                            });
                        }
                        postAñadido[0].cantidad="1"; 
                        //Copio carritoActual en Z
                        const Z = [...this.state.carritoActual];
                        var long=(Z.length);
                        Z[long]=postAñadido;
                        this.setState({ carritoActual: Z });
                    });
        }

    }

    //Método cuando se ha restado un producto
    restar = (idRestar) => {
        const Nproductos = this.state.carritoActual.length;

        //Compruebo la cantidad de ese producto en el carrito
        for(var i=0; i<Nproductos ;i++){
            
            if(idRestar===this.state.carritoActual[i][0].idb){
                console.log("Restamos una unidad del producto");
                //Copio carritoActual en X
                const X = [...this.state.carritoActual];
                X[i][0].cantidad--;
                this.setState({ carritoActual: X });
                //Compeubo si la cantidad es 0 para eliminar producto
                if(this.state.carritoActual[i][0].cantidad===0){
                    console.log("Producto eliminado del carrito");
                    const borro = [...this.state.carritoActual]; //Cojo todo del estado carritoActual
                    borro.splice(i, 1);    //Extraigo el componente con el índice pulsado 
                    this.setState({carritoActual: borro}); //Actualizo carritoActual
                }
                i=Nproductos+5;
            }

        }
        
        if(i!==(Nproductos+6)){
            console.log("No había ninguna unidad de dicho producto");
        }
    }

    sumaTotal() {
        let suma = 0;
        const Nproductos = this.state.carritoActual.length;
        for(var i=0; i<Nproductos ;i++){
            const P = this.state.carritoActual[i][0].precio;
            const C = this.state.carritoActual[i][0].cantidad;
            suma = suma+(P*C);
        }
        return suma;
    }

    realizarPedido() {

        if ((this.state.precioTotal)!==0){
            window.location="../confirmacion";
        }

    }

    render () {
        //Lo veremos si ha habido un error
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let carrito = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        //Si no ha habido error:
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.idb} 
                    nombre={post.nombre} 
                    imagen={post.imagen}
                    descripcion={post.descripcion}
                    precio={post.precio}
                    clicked={() => this.postSelectedHandler(post.idb)}
                    clickedAñadir={() => this.añadir(post.idb)}
                    clickedRestar={() => this.restar(post.idb)} />;
            });
            carrito = this.state.carritoActual.map(carritoA => {
                return <PostCarrito 
                    key={carritoA[0].idb} 
                    nombre={carritoA[0].nombre} 
                    imagen={carritoA[0].imagen}
                    descripcion={carritoA[0].descripcion}
                    precio={carritoA[0].precio}
                    cantidad={carritoA[0].cantidad}/>;
            });

        }

        return (
          <div class="Completo">
          <div class="row">
            <div class="col-sm-9">
                <div><h2> SECCIÓN 1 - POSTS </h2></div>
                <section className="Posts">
                    {posts}
                </section>
                <div><h2> SECCIÓN 2 - FULLPOST </h2></div>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
            </div> 
            <div class="col-sm-3">
                <div><h3> SECCIÓN CARRITO </h3></div>
                <section>
                    {carrito}
                    <div>
                        <p>PRECIO TOTAL: {this.sumaTotal()} €</p>
                        <button onClick={this.realizarPedido()}>REALIZAR PEDIDO</button>
                    </div>
                </section>
            </div>    
          </div>

          {/*<div><h1> SECCIÓN 3 - ADD A POST </h1></div>
                <section>
                    <NewPost/>
                </section>
           */}

          </div>
        );
    }
}

export default Tienda;