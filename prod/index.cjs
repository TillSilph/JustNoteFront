const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const path = require('path')

app.use(cookieParser());
app.get('/index.html', (req, res) => {
    res.redirect("/")
});

const indetification = async (req, res, next) => {
    const decodedJWT = req.cookies.jwtoken && await validateJwt(req.cookies.jwtoken, process.env.PRIVATE_KEY || "defaultpkey");
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    if (decodedJWT)
        return next();
    res.status(307)
        .set('Location', `${req.protocol}://${process.env.GEA_URL}/auth?old=${fullUrl}`)
        .end();
}

app.get('/', indetification, (req, res) => {
    res.sendFile(path.join(__dirname, '../', "dist", 'index.html'));
});
app.use(express.static(path.join(__dirname, '../', "dist")));
app.listen(process.env.PORT??4090, () => {
    console.log(`Start!`);
})


function validateJwt(token, key) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                resolve(null);
            }
            resolve(decoded);
        });
    });
}