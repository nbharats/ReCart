from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Wishlist

wishlist_bp = Blueprint(
    "wishlist",
    __name__,
    url_prefix="/api/wishlist"
)

@wishlist_bp.route("", methods=["GET"])
@jwt_required()
def get_wishlist():
    user_id = int(get_jwt_identity())

    wishlist_items = Wishlist.query.filter_by(
        user_id=user_id
    ).order_by(
        Wishlist.created_at.desc()
    ).all()

    products = [
        {
            "id": item.product_id
        }
        for item in wishlist_items
    ]

    return jsonify({
        "success": True,
        "wishlist": products
    }), 200

@wishlist_bp.route("", methods=["POST"])
@jwt_required()
def add_to_wishlist():
    user_id = int(get_jwt_identity())

    data = request.get_json()

    if not data or "product_id" not in data:
        return jsonify({
            "success": False,
            "message": "product_id is required"
        }), 400

    product_id = data["product_id"]

    existing_item = Wishlist.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if existing_item:
        return jsonify({
            "success": False,
            "message": "Product is already in your wishlist"
        }), 409

    wishlist_item = Wishlist(
        user_id=user_id,
        product_id=product_id
    )

    db.session.add(wishlist_item)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Product added to wishlist",
        "product_id": product_id
    }), 201

@wishlist_bp.route("/<int:product_id>", methods=["DELETE"])
@jwt_required()
def remove_from_wishlist(product_id):
    user_id = int(get_jwt_identity())

    wishlist_item = Wishlist.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if not wishlist_item:
        return jsonify({
            "success": False,
            "message": "Product not found in wishlist"
        }), 404

    db.session.delete(wishlist_item)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Product removed from wishlist",
        "product_id": product_id
    }), 200

