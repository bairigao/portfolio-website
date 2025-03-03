from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app.models.experience import Experience
from app import db
from flask_jwt_extended import jwt_required


bp = Blueprint('experience', __name__, url_prefix='/experience')

@bp.route('/', methods=['GET'])
@cross_origin()
def get_experiences():
    experiences = Experience.query.all()
    return jsonify([exp.to_dict() for exp in experiences])

@bp.route('/', methods=['POST'])
@jwt_required()
@cross_origin()
def create_experience():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debug print
        
        # Validate required fields
        required_fields = ['title', 'company', 'start_date']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 422

        # Create new experience
        new_experience = Experience(
            title=data['title'],
            company=data['company'],
            start_date=data['start_date'],
            end_date=data.get('end_date', ''),  # Optional field
            description=data.get('description', '')  # Optional field
        )
        
        db.session.add(new_experience)
        db.session.commit()
        
        return jsonify(new_experience.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Error creating experience: {str(e)}")  # Debug print
        return jsonify({'error': str(e)}), 422

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_experience(id):
    experience = Experience.query.get_or_404(id)
    data = request.get_json()
    
    experience.title = data.get('title', experience.title)
    experience.company = data.get('company', experience.company)
    experience.start_date = data.get('start_date', experience.start_date)
    experience.end_date = data.get('end_date', experience.end_date)
    experience.description = data.get('description', experience.description)
    
    db.session.commit()
    return jsonify(experience.to_dict())

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_experience(id):
    experience = Experience.query.get_or_404(id)
    db.session.delete(experience)
    db.session.commit()
    return '', 204