from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/skills', methods=['GET'])
def get_skills():
    skills = ['Python', 'Flask', 'React', 'JavaScript', 'SQL']
    return jsonify(skills)

@api.route('/api/projects', methods=['GET'])
def get_projects():
    projects = [
        {'name': 'Hospital Management System', 'description': 'A prototype for hospital management.'},
        {'name': 'Portfolio Website', 'description': 'A dynamic portfolio using Flask and React.'}
    ]
    return jsonify(projects)

@api.route('/api/experience', methods=['GET'])
def get_experience():
    experience = [
        {'role': 'IT Support', 'description': 'Handled network management and troubleshooting.'},
        {'role': 'Software Developer Intern', 'description': 'Worked on backend APIs using Flask.'}
    ]
    return jsonify(experience)
