from app import db
from app.models.projects import Project
from app.models.skills import Skill
from app.models.experience import Experience

def init_db():
    db.create_all()
