from flask import Flask
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from flask_mail import Mail
# from flask_uploads import configure_uploads, UploadSet, IMAGES
from flask_talisman import Talisman
from dotenv import load_dotenv
import os

db = MongoEngine()
bcrypt = Bcrypt()
mail = Mail()
# images = UploadSet('images', IMAGES)

def create_app():
    load_dotenv()  # Charger les variables d'environnement
    app = Flask(__name__)
    app.config.from_object('config.Config')  # Charger la configuration

    # Initialisation des extensions
    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    # configure_uploads(app, images)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    Talisman(app)

    # Importer et enregistrer les blueprints
    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app