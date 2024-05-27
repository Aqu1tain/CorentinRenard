export const authorizeUser = async (req, res, next) => {
    // Vérifier si l'utilisateur est autorisé à accéder à la ressource
    if (!req.session.userId) {
        return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.' });
    }
    next();
};


