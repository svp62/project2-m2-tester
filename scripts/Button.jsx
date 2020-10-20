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








/*
export function Text() {
    
    return (
        <div class="container">
            <form onSubmit={handleSubmit}>
                <input class="textbox" id="address_input" placeholder="Enter a text message"></input>
                
                <button  class="button button1">Send</button>
            </form>
        </div>
    );

}

*/

















/*

function handleSubmit2(response) {
    console.log(response);
    
    
    let name = response.nt.Ad;
    let email = response.nt.Wt;
    let image = response.profileObj.imageUrl;
  
  
   Socket.emit('new google user', {
       'name': name, 'image': image
   });
   
   Socket.emit('new google email', {
       'email': email
   });
   
    console.log('Sent the name ' + name + ' to server!');
   console.log('Sent the email ' + email + ' to server!');
   console.log('Sent the image ' + image + ' to server!');
   
}

export function GoogleButton() {
    return <GoogleLogin
    clientId="1005645806016-ect6cibci8knbp3g9piaud6mf392pfvu.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={handleSubmit2}
    onFailure={handleSubmit2}
    cookiePolicy={'single_host_origin'}
  />;
}





(
        <div class="container">
            <form onSubmit={handleSubmit}>
                <input class="textbox" id="address_input" placeholder="Enter a text message"></input>
                
                <button  class="button button1">Send</button>
            </form>
        </div>
    );








*/