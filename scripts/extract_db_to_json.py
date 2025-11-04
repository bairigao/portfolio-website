import sqlite3
import json
import os

# Path to database
DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'backend', 'instance', 'portfolio.db')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'data')

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_data():
    """Extract data from SQLite database and save as JSON files"""
    
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # This enables column access by name
        cursor = conn.cursor()
        
        # Extract Skills
        cursor.execute("SELECT * FROM skill")
        skills = [dict(row) for row in cursor.fetchall()]
        with open(os.path.join(OUTPUT_DIR, 'skills.json'), 'w', encoding='utf-8') as f:
            json.dump(skills, f, indent=2, ensure_ascii=False)
        print(f"[+] Extracted {len(skills)} skills")
        
        # Extract Projects
        cursor.execute("SELECT * FROM project")
        projects = [dict(row) for row in cursor.fetchall()]
        with open(os.path.join(OUTPUT_DIR, 'projects.json'), 'w', encoding='utf-8') as f:
            json.dump(projects, f, indent=2, ensure_ascii=False)
        print(f"[+] Extracted {len(projects)} projects")
        
        # Extract Experience
        cursor.execute("SELECT * FROM experience")
        experiences = [dict(row) for row in cursor.fetchall()]
        with open(os.path.join(OUTPUT_DIR, 'experiences.json'), 'w', encoding='utf-8') as f:
            json.dump(experiences, f, indent=2, ensure_ascii=False)
        print(f"[+] Extracted {len(experiences)} experiences")
        
        conn.close()
        
        print("\n[SUCCESS] All data extracted successfully!")
        print(f"[INFO] JSON files created in: {OUTPUT_DIR}")
        
    except sqlite3.Error as e:
        print(f"[ERROR] Database error: {e}")
    except Exception as e:
        print(f"[ERROR] Error: {e}")

if __name__ == "__main__":
    extract_data()

