import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGODB_SETTINGS = {
        'db': os.getenv('MONGODB_DATABASE_NAME', 'test'),
        'host': os.getenv('MONGODB_URL')
    }
    SECRET_KEY = os.getenv('SESSION_SECRET')
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT', 465)
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL', True)
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    UPLOADED_IMAGES_DEST = os.path.join(os.getcwd(), 'utils', 'images')