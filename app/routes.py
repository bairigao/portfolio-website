from flask import Blueprint, render_template, jsonify
import json

main = Blueprint('main', __name__)

# home page route 
@main.route('/')
def home():
    return render_template('index.html')

# project page load from json file
@main.route('/project')
def project():
    with open('projects.json') as f:
        project_data = json.load(f)
    return render_template('project.html', projects = project_data)

@main.route('/experience')
def experience():
    with open('experiences.json') as f:
        experience_data = json.load(f)
    return render_template('experiences.html', experiences = experience_data)

@main.route('/about')
def about():
    return render_template('about.html')

@main.route('/contact')
def contact():
    return render_template('contact.html')