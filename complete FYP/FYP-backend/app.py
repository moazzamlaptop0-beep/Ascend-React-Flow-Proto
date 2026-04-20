from flask import Flask, request, jsonify
from flask_cors import CORS
import test_model # Aapka AI model file
import os

# Database imports
from database import engine, SessionLocal
import models

# Tables create karna (agar PostgreSQL mein nahi bane huay)
models.Base.metadata.create_all(bind=engine)

app = Flask(__name__)
CORS(app)

# Database Session Helper
def get_db():
    db = SessionLocal()
    return db

# ==========================================
# 1. ADMIN STATS ROUTE (Naya Code)
# ==========================================
@app.route('/admin/stats', methods=['GET'])
def get_admin_stats():
    db = get_db()
    try:
        # Database se counts nikal rahe hain
        total_users = db.query(models.User).count()
        total_scans = db.query(models.AIScan).count()
        
        # Dashboard ke liye data bhej rahe hain
        return jsonify({
            "total_users": total_users,
            "total_scans": total_scans
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# ==========================================
# 2. AI PREDICTION & HISTORY SAVE
# ==========================================
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
        
    file = request.files['image']
    user_id = request.form.get('user_id') 
    
    file_path = "temp_image.jpg"
    file.save(file_path)
    
    result, confidence = test_model.predict_skin_disease(file_path) 
    
    if user_id and user_id != "null":
        db = get_db()
        try:
            new_scan = models.AIScan(
                image_url=file_path,
                prediction_result=result,
                confidence=float(confidence),
                user_id=int(user_id)
            )
            db.add(new_scan)
            db.commit()
        except Exception as e:
            print(f"Error saving scan: {e}")
        finally:
            db.close()

    return jsonify({
        "disease": result,
        "confidence": confidence
    })

# ==========================================
# 3. REGISTER (PostgreSQL Save)
# ==========================================
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    db = get_db()
    
    try:
        user_exists = db.query(models.User).filter(models.User.email == data['email']).first()
        if user_exists:
            return jsonify({"success": False, "error": "Email already registered!"}), 400

        new_user = models.User(
            name=data['name'],
            email=data['email'],
            password=data['password'],
            role=data.get('role', 'AI User') 
        )
        db.add(new_user)
        db.commit()
        return jsonify({"success": True, "message": "Account created successfully!"}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        db.close()

# ==========================================
# 4. LOGIN (PostgreSQL Check)
# ==========================================
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    db = get_db()
    
    email = data.get('email')
    password = data.get('password')
    portal_role = data.get('role')

    user = db.query(models.User).filter(models.User.email == email).first()

    if user and user.password == password:
        if user.role != portal_role:
             return jsonify({"success": False, "error": f"Unauthorized. Please use {user.role} portal."}), 401
             
        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }), 200
    
    db.close()
    return jsonify({"success": False, "error": "Invalid email or password!"}), 401

if __name__ == '__main__':
    app.run(port=5000, debug=True)