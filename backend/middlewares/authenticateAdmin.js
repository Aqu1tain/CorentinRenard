const authenticateAdmin = (req, res, next) => {
    // Vérifier si l'utilisateur est authentifié en tant qu'admin
    if (!req.session.isAdmin) {
        return res.status(401).json({ message: 'Accès non autorisé.' });
    }
    next();
};
  
module.exports = authenticateAdmin;
