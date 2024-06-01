const ClientComment = ({ clientCom, clientCommentOrigin, interlocuterName }) => (
    <div className='projet-comment'>
        <h3>Commentaire du Client</h3>
        <div className='projet-inner'>
            {clientCommentOrigin === "Gens de Confiance" ? 
            <img id="client-logo" src="https://tp.gensdeconfiance.com/newId/gensdeconfiance/logo_1024.png?twic=v1" alt="Logo Gens de Confiance" />
            :
            <img id="client-logo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Logo lambda" />
            }
            <div className='client-citation'>
                <p id="client-com" dangerouslySetInnerHTML={{ __html: clientCom }}></p>
                <p>{interlocuterName}, via {clientCommentOrigin}</p>
            </div>
        </div>
    </div>
);

export default ClientComment;