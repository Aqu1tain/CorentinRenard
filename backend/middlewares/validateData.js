const validateData = (req, res, next) => {
    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }
    next();
};

module.exports = validateData;
