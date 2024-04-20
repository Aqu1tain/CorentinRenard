import React from 'react';
import './Contact.scss';
import Button from '../Button/Button';

export default function Contact() {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch('http://localhost:3001/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                lastName,
                email,
                subject: subject === 'dont know yet' ? ['webdesign', 'webdev'] : subject,
                message
            })
        });
        if (res.ok) {
            window.alert('Votre message a bien été envoyé !')
        } else {
            const error = await res.text();
            window.alert(`Erreur lors de l'envoi du message : ${error}`);
        }
    }


    return (
        <div className="contact">
        <h1 className="title">Me contacter</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-field">
                <input required type="text" value={name} onChange={(event) => setName(event.target.value)} />
                <label>Nom</label>
            </div>
            <div className="input-field">
                <input required type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                <label>Prénom</label>
            </div>
            <div className="input-field">
                <input required type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                <label>Adresse email</label>
            </div>
            <select value={subject} onChange={(event) => setSubject(event.target.value)}>
                <option value="webdesign">Webdesign</option>
                <option value="webdev">Développement web</option>
                <option value="dont know yet">Je ne sais pas encore</option>
            </select>
            <div className="input-field message">
                <textarea value={message} minLength="1" required onChange={(event) => setMessage(event.target.value)} />
                <label>Message</label>
            </div>
            <Button type="submit">Envoyer</Button>
        </form>
        </div>
    )
}

//Create me a contact form with email; subject : webdesign or webdev or two (webdesign and webdev) or "dont know yet", it’s a list of choices, all in french. Input for name and last name, ant content of the message. dont forget the submit button