from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity

from extensions import db
from models import User


auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data provided"
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validation
    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Name, email and password are required"
        }), 400

    if len(name) < 2:
        return jsonify({
            "success": False,
            "message": "Name must be at least 2 characters"
        }), 400

    if "@" not in email or "." not in email:
        return jsonify({
            "success": False,
            "message": "Please enter a valid email address"
        }), 400

    if len(password) < 6:
        return jsonify({
            "success": False,
            "message": "Password must be at least 6 characters"
        }), 400

    # Check existing user
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "An account with this email already exists"
        }), 409

    # Create hashed password
    password_hash = generate_password_hash(password)

    # Create user
    user = User(
        name=name,
        email=email,
        password_hash=password_hash
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Registration successful",
        "user": user.to_dict()
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data provided"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    access_token = create_access_token(
        identity = str(user.id)
    )

    return jsonify({
        "success": True,
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    }), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            'success': False,
            'message': 'User not found'
        })

    return jsonify({
        'success': True,
        'user': user.to_dict() 
    }),200
