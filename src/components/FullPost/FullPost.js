import React, { Component } from 'react';
import axios from '../../axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            
            if (!this.state.loadedPost || this.state.loadedPost.idb !== this.props.id) {
                axios.get('/posts.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    
                    .then(response => {
                        const posts = [];
                        for (let key in response.data) {
                            posts.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        
                        this.setState({ loadedPost: posts[0] });
                    });
            }
        }
    }


    render() {
        let post = <p style={{ textAlign:'center', color:'red'}}>Selecciona un Post para más detalles</p>;

        if (this.props.id) {
            post = <p style={{ textAlign:'center', color:'red'}}>...Loading...Loading...Loading...</p>;
        }
        
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
            
                    <h1>{this.state.loadedPost.nombre}</h1>
		            <img src={this.state.loadedPost.imagen} alt="imagen" class="img-fluid" width="250"/>
                    <p></p>
                    <p>DESCRIPCIÓN: {this.state.loadedPost.descripcion}</p>
                    <p><em>PRECIO(€): {this.state.loadedPost.precio}</em></p>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;