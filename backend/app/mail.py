from flask_mail import Message
from flask import current_app

def send_email(subject, sender, recipient, body):
    mail = current_app.extensions['mail']
    msg = Message(subject=subject,
                  sender=sender,
                  recipients=[recipient])
    msg.body = body
    try:
        mail.send(msg)
        return {"message": "Email sent successfully"}, 200
    except Exception as e:
        return {"message": f"Error sending email: {str(e)}"}, 500