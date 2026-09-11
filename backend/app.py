from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from extensions import db,jwt
from models import User, Order, OrderItem

from routes.auth import auth_bp
from routes.orders import orders_bp
from routes.wishlist import wishlist_bp

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(wishlist_bp)

    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return jsonify({
            "message": "ReCart API is running"
        })

    @app.route("/api/test-db")
    def test_db():
        try:
            user_count = User.query.count()

            return jsonify({
                "success": True,
                "message": "Database connection successful",
                "users": user_count
            })

        except Exception as e:
            return jsonify({
                "success": False,
                "error": str(e)
            }), 500

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)