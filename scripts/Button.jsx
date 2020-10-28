import * as React from 'react';
import { Socket } from './Socket';

import './style.css';

function handleSubmit(event) {
    let newAddress = document.getElementById("address_input");
    
    Socket.emit('new address input', {
        
        'address': newAddress.value,
    });
    
    console.log('Sent the address ' + newAddress.value + ' to server!');
    newAddress.value = ''
    
    event.preventDefault();
}


export function Button() {
    return (
        <div class="container">
            <form onSubmit={handleSubmit}>
                <input class="textbox" id="address_input" placeholder="Enter a text message"></input>
                
                <button  class="button button1">Send</button>
            </form>
        </div>
    );
}

