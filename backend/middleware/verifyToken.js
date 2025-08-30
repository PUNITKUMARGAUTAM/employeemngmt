const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req , res , next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({message : "Unauthorized"});
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECR);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(403).json({message : "Invalid token"});
    }
};

module.exports = verifyToken;