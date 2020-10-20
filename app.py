# app.py
from os.path import join, dirname
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
import json
import requests
import models 
import re


ADDRESSES_RECEIVED_CHANNEL = 'addresses received'
USERS_UPDATED_CHANNEL = 'users updated'

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)

database_uri = os.environ['DATABASE_URL']

name = ""
image = ""
active_user_count= 0

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app
db.create_all()
db.session.commit()

def emit_all_addresses(channel):
    

    all_addresses = [ \
    
        db_address.address for db_address in \
        db.session.query(models.Usps).all()]

    socketio.emit(channel, {
        'allAddresses': all_addresses
    })
def emit_all_oauth_users(channel):
    all_users = [ \
        user.name for user \
        in db.session.query(models.AuthUser).all()]
        
    all_users_image = [\
        user.image for user \
        in db.session.query(models.AuthUser).all()]  
        
    socketio.emit(channel, {
        'allUsers': all_users
    })
    
    socketio.emit(channel, {
        'allUsersImage': all_users_image
    })

def push_new_user_to_db(name, image, email, auth_type):
    
    db.session.add(models.AuthUser(name, image, email, auth_type));
    db.session.commit();
        
    emit_all_oauth_users(USERS_UPDATED_CHANNEL)
    

@socketio.on('connect')
def on_connect():
    print('Someone connected!')
    global active_user_count
    #print(requests.sid)
    active_user_count = active_user_count + 1
    
    socketio.emit('connected', {
        'test': active_user_count
    })
    
    emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)
    emit_all_oauth_users(USERS_UPDATED_CHANNEL)
    

@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')
    global active_user_count
    
    active_user_count = active_user_count - 1
    socketio.emit('disconnected', {
        'test': active_user_count
    })
    
#User_name = []
email_list = []
@socketio.on('new google user')
def on_new_google_user(data):
    print("Got an event for new google user input with data:", data)
    push_new_user_to_db(data['name'], data['image'], data['email'], models.AuthUserType.GOOGLE)
    global name
    global image
    name = data['name']
    image = data['image']
    email_list.append(data['email'])
    
    socketio.emit('new google users', {
        'name': name, 'image': image, 'email': email_list
    })
    
    
    
    socketio.emit('connected', {
        'test': active_user_count
    })

@socketio.on('new address input')
def on_new_address(data):
    print("Got an event for new address input with data:", data)
    
    Text_input = data["address"]
    
    send_back = ""
    
    new_string = ""
    
    if Text_input.startswith('!! '):
        for i in range(3, len(Text_input)):
            new_string += Text_input[i]
        new_string = str(new_string.lower()) 
        if new_string.startswith('about'):
            send_back =  "Hii, I am a chat bot. \nI can translate text for you in minion language. \n write !! help to see what commands I can take."
            
        elif new_string.startswith('help'):
            send_back = "I can take following commands. \n !! about, !! help, !! translate <text here>, !! dictionary <word>. "
            
        elif new_string.startswith('dictionary'):
            word_id = ""
            for i in range(11, len(new_string)):
                word_id += new_string[i] 
            try:
                if " " not in word_id:
                    app_id = os.environ['APP_ID']
                    app_key = os.environ['APP_KEY']
                    endpoint = "entries"
                    language_code = "en-us"
        
                    header_params = {"app_id": app_id, "app_key": app_key}
        
                    url = "https://od-api.oxforddictionaries.com/api/v2/" + endpoint + "/" + language_code + "/" + word_id.lower()
        
                    response = requests.get(url, headers = header_params)
                    if response.status_code == 200:
                        json_body = response.json()
                        results = json_body["results"]
                        api_response = str(results[0]["lexicalEntries"][0]["entries"][0]["senses"][0]["definitions"][0])
                        send_back = ""
                        counter = 0
                        for i in range(0, len(api_response)):
	                        if counter < 450:
		                        send_back += api_response[i]
		                        counter += 1
	                        else:
	                            send_back = send_back + "..."
	                            break
                    else:
                        send_back = "There is No Data, Pleae try with some other Keyword!"
                else:
                    send_back = "Please try with one Keyword only !"
            except Exception:
                send_back = "Service is down right now, try again later!"
            
            
        elif new_string.startswith('translate'):
            str_api_call = ""
            for i in range(10, len(new_string)):
                str_api_call += new_string[i] 
            url = "https://api.funtranslations.com/translate/minion.json?text={}".format(str_api_call)
            response = requests.get(url)
            if response.status_code == 200:
                json_body = response.json()
                send_back = json_body["contents"]["translated"]
            else:
                send_back = "Service is down right now, try again later !"
                
        else:
            send_back = "Entry is not valid please try with !! help"
          
            
    regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
    url = re.findall(regex, Text_input)       
    url_message = [x[0] for x in url]
    actual_url = str(url_message)
    print("we got url", actual_url )
    
    socketio.emit('new links', {
         'link': actual_url,
     })
    
    
    
    if(len(send_back) == 0):
        Text_input2 = name +": " + Text_input
        db.session.add(models.Usps(Text_input2));
        db.session.commit();
        
        emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)
        
    else:
        Text_input2 = name +": " + Text_input
        send_back2 = "Chat Bot: " + send_back
        db.session.add(models.Usps(Text_input2));
        db.session.add(models.Usps(send_back2));
        db.session.commit();
        
        emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)


@app.route('/')
def index():
    emit_all_oauth_users(USERS_UPDATED_CHANNEL)
    emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)

    return flask.render_template("index.html")

if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
