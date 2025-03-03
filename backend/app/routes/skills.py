from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app.models.skills import Skill
from app import db
from flask_jwt_extended import jwt_required

bp = Blueprint('skills', __name__, url_prefix='/skills')

@bp.route('/', methods=['GET'])
@cross_origin()
def get_skills():
    skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])

@bp.route('/', methods=['POST'])
@jwt_required()
@cross_origin()
def create_skill():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debugging

        if not data:
            return jsonify({'error': 'No JSON received'}), 400

        required_fields = ['name', 'category', 'icon_name', 'level', 'description']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
            if not isinstance(data[field], str):
                return jsonify({'error': f'{field} must be a string'}), 400

        skill = Skill(
            name=data['name'],
            category=data['category'],
            icon_name=data['icon_name'],
            level=data['level'],
            description=data['description']
        )

        db.session.add(skill)
        db.session.commit()

        return jsonify(skill.to_dict()), 201

    except Exception as e:
        print("Error in create_skill:", str(e))  # Debugging
        return jsonify({'error': str(e)}), 500

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_skill(id):
    skill = Skill.query.get_or_404(id)
    data = request.get_json()
    
    try:
        if 'name' in data:
            skill.name = data['name']
        if 'category' in data:
            skill.category = data['category']
        if 'icon_name' in data:
            skill.icon_name = data['icon_name']
        if 'level' in data:
            skill.level = data['level']
        if 'description' in data:
            skill.description = data['description']
            
        db.session.commit()
        return jsonify(skill.to_dict())
        
    except Exception as e:
        db.session.rollback()
        print(f"Error updating skill: {str(e)}")  # For debugging
        return jsonify({'error': 'Failed to update skill'}), 500

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_skill(id):
    skill = Skill.query.get_or_404(id)
    try:
        db.session.delete(skill)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting skill: {str(e)}")  # For debugging
        return jsonify({'error': 'Failed to delete skill'}), 500