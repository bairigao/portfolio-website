from app import db
from datetime import datetime

class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.String(50), nullable=False)  # Changed to String
    end_date = db.Column(db.String(50))  # Can be null for current positions
    description = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'description': self.description
        }