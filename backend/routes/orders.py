from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models import Order, OrderItem


orders_bp = Blueprint(
    "orders",
    __name__,
    url_prefix="/api/orders"
)

@orders_bp.route("", methods=["POST"])
@jwt_required()
def create_order():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body is required"
        }), 400

    required_fields = [
        "items",
        "billingAddress",
        "shippingAddress",
        "paymentMethod",
        "subtotal",
        "shipping",
        "total"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    if not data["items"]:
        return jsonify({
            "success": False,
            "message": "Order must contain at least one item"
        }), 400

    order = Order(
        user_id=user_id,
        payment_method=data["paymentMethod"],
        subtotal=data["subtotal"],
        shipping=data["shipping"],
        total=data["total"],
        billing_address=data["billingAddress"],
        shipping_address=data["shippingAddress"],
        status="Placed"
    )

    db.session.add(order)

    db.session.flush()

    for item in data["items"]:

        order_item = OrderItem(
            order_id=order.id,
            product_id=item["id"],
            title=item["title"],
            price=item["price"],
            quantity=item["quantity"],
            subtotal=item["price"] * item["quantity"]
        )

        db.session.add(order_item)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Order created successfully",
        "order": {
            "id": order.id,
            "user_id": order.user_id,
            "payment_method": order.payment_method,
            "subtotal": order.subtotal,
            "shipping": order.shipping,
            "total": order.total,
            "status": order.status,
            "created_at": order.created_at.isoformat()
        }
    }), 201

@orders_bp.route("", methods=["GET"])
@jwt_required()
def get_orders():

    user_id = int(get_jwt_identity())

    orders = Order.query.filter_by(
        user_id=user_id
    ).order_by(
        Order.created_at.desc()
    ).all()

    result = []

    for order in orders:

        result.append({
            "id": order.id,
            "subtotal": order.subtotal,
            "shipping": order.shipping,
            "total": order.total,
            "payment_method": order.payment_method,
            "status": order.status,
            "created_at": order.created_at.isoformat(),

            "items": [
                {
                    "id": item.product_id,
                    "title": item.title,
                    "price": item.price,
                    "quantity": item.quantity,
                    "subtotal": item.subtotal
                }
                for item in order.items
            ]
        })

    return jsonify({
        "success": True,
        "orders": result
    }), 200

@orders_bp.route("/<int:order_id>", methods=["GET"])
@jwt_required()
def get_order(order_id):

    user_id = int(get_jwt_identity())

    order = Order.query.filter_by(
        id=order_id,
        user_id=user_id
    ).first()

    if not order:
        return jsonify({
            "success": False,
            "message": "Order not found"
        }), 404

    return jsonify({
        "success": True,
        "order": {
            "id": order.id,
            "subtotal": order.subtotal,
            "shipping": order.shipping,
            "total": order.total,
            "payment_method": order.payment_method,
            "status": order.status,
            "billing_address": order.billing_address,
            "shipping_address": order.shipping_address,
            "created_at": order.created_at.isoformat(),

            "items": [
                {
                    "id": item.product_id,
                    "title": item.title,
                    "price": item.price,
                    "quantity": item.quantity,
                    "subtotal": item.subtotal
                }
                for item in order.items
            ]
        }
    }), 200

@orders_bp.route("/<int:order_id>/cancel",methods=['PUT'])
@jwt_required()
def cancel_order(order_id):
    user_id = int(get_jwt_identity())

    order = Order.query.filter_by(
        id = order_id,
        user_id = user_id
    ).first()

    if not order:
        return jsonify({
            'success' : False,
            'message' : 'Order not found'
        }),404

    if order.status == "Cancelled":
        return jsonify({
            "success": False,
            "message": "Order is already cancelled" 
        }), 400

    order.status = 'Cancelled'

    db.session.commit()

    return jsonify({
        "success": True, 
        "message": "Order cancelled successfully", 
        "order": { 
            "id": order.id, 
            "subtotal": order.subtotal, 
            "shipping": order.shipping, 
            "total": order.total, 
            "payment_method": order.payment_method, 
            "status": order.status, 
            "created_at": order.created_at.isoformat() 
        }
    }),200

