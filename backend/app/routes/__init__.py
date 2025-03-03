from flask import Blueprint
from app.routes import projects, skills, experience, auth

bp = Blueprint('api', __name__, url_prefix='/api')

# Register all route blueprints
bp.register_blueprint(auth.bp)
bp.register_blueprint(projects.bp)
bp.register_blueprint(skills.bp)
bp.register_blueprint(experience.bp)