const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            { url: /\/api\/v1\/patients(.*)/, methods: ['GET', 'POST', 'PUT'] },
            { url: /\/api\/v1\/hospitals(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE'] },
            { url: /\/api\/v1\/request(.*)/, methods: ['GET', 'POST', 'DELETE'] },
            `${api}/patients/login`,
            `${api}/patients/register`,
        ]
    })
}

module.exports = authJwt;