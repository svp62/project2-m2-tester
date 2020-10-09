 
 import * as React from 'react';


import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [addresses, setAddresses] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('addresses received', (data) => {
                console.log("Received addresses from server: " + data['allAddresses']);
                setAddresses(data['allAddresses']);
            })
        });
    }
    
    getNewAddresses();

    return (
        <div>
            <h1>Sample Chat!</h1>
                
                    {
                    // TODO display all addresses
                    addresses.map((address, index) =>  <h3 key={index}>{address}</h3>)

                    }
                
            <Button />
        </div>
    );
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /*   
import * as React from 'react';


import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [addresses, setAddresses] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('addresses received', updateAddresses);
            return () => {
                Socket.off('addresses received', updateAddresses);
            }
        });
    }
    
    function updateAddresses(data) {
        console.log("Received addresses from server: " + data['all_Addresses']);
        setAddresses(data['all_Addresses']);
    }
    
    getNewAddresses();

    return (
        <div>
            <h1>USPS Addresses!</h1>
                
                    {
                    // TODO
                        addresses.map(
                            (address, index) => <h3 key={index}> {addresses} </h3>)
                    }
                
            <Button />
        </div>
    );
}
*/