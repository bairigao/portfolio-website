import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app, db
from app.models.user import User

def create_admin(username, email, password):
    app = create_app()
    with app.app_context():
        # Check if admin already exists
        if User.query.filter_by(is_admin=True).first():
            print("An admin user already exists!")
            return
        
        # Create admin user
        admin = User(
            username=username,
            email=email,
            is_admin=True
        )
        admin.set_password(password)
        
        db.session.add(admin)
        db.session.commit()
        print(f"Admin user '{username}' created successfully!")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python create_admin.py <username> <email> <password>")
        sys.exit(1)
    
    username = sys.argv[1]
    email = sys.argv[2]
    password = sys.argv[3]
    create_admin(username, email, password)