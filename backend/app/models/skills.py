from app import db

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    icon_name = db.Column(db.String(50))  # This was missing
    level = db.Column(db.String(20))
    description = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'icon_name': self.icon_name,
            'level': self.level,
            'description': self.description
        }