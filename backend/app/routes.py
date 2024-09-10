from flask import Blueprint, request, jsonify
from .models import Post
from app.mail import send_email

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/posts', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_posts():
    if request.method == 'GET':
        posts = Post.objects()
        return jsonify(posts)
    if request.method == 'POST':
        post = Post(**request.json).save()
        return jsonify({'message': 'Post created successfully.', 'post': post})
    if request.method == 'PUT':
        post = Post.objects.get(id=request.json['id'])
        post.update(**request.json)
        return jsonify({'message': 'Post updated successfully.', 'post': post})
    if request.method == 'DELETE':
        post = Post.objects.get(id=request.json['id'])
        post.delete()
        return jsonify({'message': 'Post deleted successfully.'})

@main_bp.route('/api/send-email', methods=['POST'])
def handle_send_email():
    data = request.get_json()

    subject = data.get('lastName', '') + ' ' + data.get('name', '')  + ' - ' + data.get('subject', '')
    body = data.get('email', '') + ' vous a envoyé ceci :\n\n' + data.get('message', '')
    recipient = 'contact@corentinrenard.com'
    sender = 'contact@corentinrenard.com'

    response, status_code = send_email(subject, sender, recipient, body)
    return jsonify(response), status_code