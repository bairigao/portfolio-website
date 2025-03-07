from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    # Get configuration based on environment
    config_name = os.environ.get('FLASK_ENV', 'development')
    app = Flask(__name__)
    
    # Database configuration
    DATABASE_URL = os.environ.get('DATABASE_URL')
    if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL or 'sqlite:///portfolio.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-dev-key')
    
    # CORS configuration
    app.config['CORS_ORIGINS'] = [os.environ.get('FRONTEND_URL', 'http://localhost:5173')]
    app.config['CORS_METHODS'] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    app.config['CORS_ALLOW_HEADERS'] = ['Content-Type', 'Authorization']
    app.config['CORS_SUPPORTS_CREDENTIALS'] = True

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Initialize CORS
    CORS(app, 
         resources={r"/api/*": {
             "origins": app.config['CORS_ORIGINS'],
             "methods": app.config['CORS_METHODS'],
             "allow_headers": app.config['CORS_ALLOW_HEADERS'],
             "supports_credentials": app.config['CORS_SUPPORTS_CREDENTIALS']
         }})

    # Import and register blueprints
    from app.routes import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # Add a health check endpoint
    @app.route('/health')
    def health_check():
        return {"status": "healthy"}, 200

    return app

app = create_app()

# Create tables if they don't exist
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
