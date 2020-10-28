import * as React from 'react';
import { GoogleButton } from './GoogleButton';
import classes from './style.css';
import { Socket } from './Socket';
import { Content } from "./Content";
import GoogleLogin from 'react-google-login';

export default function App() {
    
    const [hasError, setHasError] = React.useState(true);
    
    const handleSubmit = React.useCallback(response => {
        console.log(response);
        
        if(response.profileObj) {
            setHasError(false);
        }
        
        let name = response.profileObj.name;
        let email = response.profileObj.email;
        let image = response.profileObj.imageUrl;
  
        Socket.emit('new google user', {
            'name': name, 'image': image, 'email': email
        });
   
        
   
        console.log('Sent the name ' + name + ' to server!');
        console.log('Sent the email ' + email + ' to server!');
        console.log('Sent the image ' + image + ' to server!');
    }, []);
    
    const handleLogout = React.useCallback(() => {
        setHasError(true);
    }, []);
    
    if(!hasError) {
        return (
            <Content
                onLogout={handleLogout}
            />
        );
    }
    
    console.log(hasError);
    
    return (
        <div class="headerclass">
            <h1>Public Chat Room!</h1>
            <h2>To enter chat room please login with google</h2>
            <GoogleLogin
                clientId="1005645806016-ect6cibci8knbp3g9piaud6mf392pfvu.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={handleSubmit}
                onFailure={handleSubmit}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}