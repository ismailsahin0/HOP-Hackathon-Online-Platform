const jwt = require('jsonwebtoken')

module.exports =  (req, res, next)=>{
    const token = req.header('auth');
    if(!token) return res.status(401).send('denied')

    try{
        const userVerified = jwt.verify(token, `${process.env.MY_SECRET_TOKEN}`)
        req.user = userVerified;
        next();
    } catch(error){
        res.status(401).send('denied')
    }
}