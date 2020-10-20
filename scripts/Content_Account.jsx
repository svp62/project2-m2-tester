import * as React from 'react';
import { GoogleButton } from './GoogleButton';
import './style.css';
import { Socket } from './Socket';

export function Content_Account() {
    const [accounts, setAccounts] = React.useState([]);
    const [names, setNames] = React.useState([]);
    const [Images, setImages] = React.useState([]);
      
    function getAllAccounts() {
        React.useEffect(() => {
            Socket.on('accounts received', (data) => {
                let allAccounts = data['allAccounts'];
                console.log("Received accounts from server: " + allAccounts);
                setAccounts(allAccounts);
            })
        });
    }
    function getNewName() {
        React.useEffect(() => {
            Socket.on('new google users', (data) => {
                console.log("Received name from server: " + data['name']);
                setNames(data['name']);
            })
        });
    }
    
    function getNewImage() {
        React.useEffect(() => {
            Socket.on('new google users', (data) => {
                console.log("Received name from server: " + data['image']);
                setImages(data['image']);
            })
        });
    }
    
    
    
    getAllAccounts();
    getNewName();
    getNewImage();
   
    
    //console.log({people});
    
    
    return (
    
        
    <div class="headerclass">
      <h1>Chat app</h1>
     
      <GoogleButton />


     
      </div>
     
    );

}
























/*


import * as React from 'react';
import './style.css';

import { GoogleButton } from './GoogleButton';
import { Socket } from './Socket';



export function Content_Account() {
    const [accounts, setAccounts] = React.useState([]);
    const [names, setNames] = React.useState([]);
    const [Images, setImages] = React.useState([]);
    
    
    function getAllAccounts() {
        React.useEffect(() => {
            Socket.on('accounts received', (data) => {
                let allAccounts = data['allAccounts'];
                console.log("Received accounts from server: " + allAccounts);
                setAccounts(allAccounts);
            })
        });
    }
    function getNewName() {
        React.useEffect(() => {
            Socket.on('new google users', (data) => {
                console.log("Received name from server: " + data['name']);
                setNames(data['name']);
            })
        });
    }
    
    function getNewImage() {
        React.useEffect(() => {
            Socket.on('new google users', (data) => {
                console.log("Received name from server: " + data['image']);
                setImages(data['image']);
            })
        });
    }
    
    
    
    getAllAccounts();
    getNewName();
    getNewImage();
    

    return (
        
        <div>
                
            <h1>Google's OAuth to authenticate users!</h1>
             <div>
                {
               
                    names.map((name, index) =>  <h4 key={index}>{name}</h4>)
                }
            </div>
           
            <GoogleButton />
            </div>
            
            
           
        
    );
} 
 
 */