import * as React from 'react';
import { Socket } from './Socket';
import './style.css';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

function handleSubmit(response) {
    console.log(response);
    console.log(response instanceof Error);
    // TODO replace with name from oauth
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
    onSuccess={handleSubmit}
    onFailure={handleSubmit}
    cookiePolicy={'single_host_origin'}
  />;
}



















/*


function handleSubmit(event) {
    // TODO replace with name from oauth
    let name = "John Doe";
    Socket.emit('new google user', {
        'name': name,
    });
    
    console.log('Sent the name ' + name + ' to server!');
}

export function GoogleButton() {
    return (
            <button onClick={handleSubmit}>Log in with Google!</button>
    );
}

*/






/*

import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
// or
import { GoogleLogin } from 'react-google-login';
 
 
const responseGoogle = (response) => {
  console.log(response);
}
 
ReactDOM.render(
  <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
  document.getElementById('googleButton')
);

*/

