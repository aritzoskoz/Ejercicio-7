import React, { Component } from 'react';

import './Bienvenid.css';

class Bienvenid extends Component {

    render () {
    
    return (
        <div>
            <div className="boxA">
                <h1> BIENVENID@ a la TIENDA ONLINE </h1>
            </div>
            <div className="boxB">
                <h3>
                    En el menú superior podrás navegar en todo momento por nuestra web:<br></br><br></br>
                    <li>Pulsando en TIENDA podrás ver todos nuestros productos y realizar un pedido</li>
                    <li>Pulsando en PEDIDOS podrás ver el histórico de pedidos realizados</li>
                </h3>
            </div>
        </div>
    )

    }

}

export default Bienvenid;
