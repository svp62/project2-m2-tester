import * as React from 'react';
import './style.css';
import { App } from './App';
import { Button } from './Button';
import { Socket } from './Socket';



export function Content({onLogout}) {
    const [addresses, setAddresses] = React.useState([]);
    const [activeusercount, setActiveusercount] = React.useState([]);
    const [accounts, setAccounts] = React.useState([]);
    const [names, setNames] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [emails, setEmails] = React.useState([]);
    const [links, setLinks] = React.useState([]); 
    
    
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('addresses received', (data) => {
                console.log("Received addresses from server: " + data['allAddresses']);
                setAddresses(data['allAddresses']);
            })
        });
    }
    
    function getActiveUserCount() {
        React.useEffect(() => {
            Socket.on('connected', (data) => {
                console.log("Received addresses from server for connect: " + data['test'] );
                setActiveusercount(data['test']);
            })
        });
    }
    
     function getInactiveUserCount() {
        React.useEffect(() => {
            Socket.on('disconnected', (data) => {
                console.log("Received addresses from server for disconnect: " + data['test']);
                setActiveusercount(data['test']);
            })
        });
    }
    
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
    
    function getNewEmail() {
        React.useEffect(() => {
            Socket.on('new google users', (data) => {
                console.log("Received name from server: " + data['email']);
                setEmails(data['email']);
            })
        });
    }
    
    function getLinks() {
        React.useEffect(() => {
            Socket.on('new links', (data) => {
                console.log("Received link from server: " + data['link']);
                setLinks(data['link']);
            })
        });
    }

    getAllAccounts();
    getNewName();
    getNewImage();
    getNewEmail();
    getNewAddresses();
    getActiveUserCount();
    getInactiveUserCount();

    return (
        
        <div class="">
            <div class="headerclass">
                <h1>Public Chat Room!</h1>
                
                <p>Active Users: {activeusercount} , ChatBot present in chat to wake up send text !! help</p>
            </div>
            <div class="log">
                {
                    //  display all messages
                    addresses.map((address, index) =>  <h4 key={index}><img src={images} width="30" height="30"/>{address}</h4>)
                }
                
                {
                //hyperlink
                        links.map((link, index) =>
                        <h3 key={index}><a href={link} >{link}</a> </h3> )
            
                    }
            </div>
            <Button />
            
            
        </div>
    );
} 
 
 
