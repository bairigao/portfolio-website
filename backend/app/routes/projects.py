from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models.projects import Project
from flask_cors import cross_origin
from app import db

bp = Blueprint('projects', __name__, url_prefix='/projects')

@bp.route('/', methods=['GET'])
@cross_origin()
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@bp.route('/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict())

@bp.route('/', methods=['POST'])
@jwt_required()
@cross_origin()
def create_project():
    data = request.get_json()
    print("Received data:", data) #debug
    project = Project(
        title=data['title'],
        description=data['description'],
        tech_stack=data['tech_stack'],
        date=data['date'],
        github_url=data.get('github_url'),
        live_url=data.get('live_url'),
        image_url=data.get('image_url')
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.get_json()
    
    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.tech_stack = data.get('tech_stack', project.tech_stack)
    project.date = data.get('date', project.date)
    project.github_url = data.get('github_url', project.github_url)
    project.live_url = data.get('live_url', project.live_url)
    project.image_url = data.get('image_url', project.image_url)
    
    db.session.commit()
    return jsonify(project.to_dict())

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return '', 204