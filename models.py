# models.py
import flask_sqlalchemy
from app import db
from enum import Enum

class AuthUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    auth_type = db.Column(db.String(120))
    name = db.Column(db.String(120))
    image = db.Column(db.String(650))
    email = db.Column(db.String(500))
    def __init__(self, name, image, email, auth_type):
        assert type(auth_type) is AuthUserType
        self.name = name
        self.image = image
        self.email = email
        self.auth_type = auth_type.value
        
    def __repr__(self):
        return "<User name: {}\nemail: {}\nimage: {}\ntype: {}".format(self.name, self.email, self.image, self.auth_type)
        
class AuthUserType(Enum):
    
    GOOGLE = "google"
    FACEBOOK = "facebook"
    PASSWORD = "password"

class Usps(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(500))
    
    def __init__(self, address):
        
        self.address = address
        
        
    def __repr__(self):
        
        return '<Usps address: %s>' % self.address 
        
        
        
        
'''
class AuthUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    auth_type = db.Column(db.String(120))
    name = db.Column(db.String(120))
    image = db.Column(db.String(650))
    
    def __init__(self, name, image, auth_type):
        assert type(auth_type) is AuthUserType
        self.name = name
        self.image = image
        self.auth_type = auth_type.value
        
    def __repr__(self):
        return "<User name: {}\nimage: {}\ntype: {}".format(self.name, self.image, self.auth_type)
        
class AuthUserType(Enum):
    
    GOOGLE = "google"
    FACEBOOK = "facebook"
    PASSWORD = "password"
    
    
    
    '''