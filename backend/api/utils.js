var jwt = require('jsonwebtoken');
const { json } = require('body-parser');


function generateToken(user) {
    let userinput = JSON.parse(user)
    if (!userinput[0]) return null;

    let userinfo = userinput[0]
    var u = {
        userId: userinfo.user_id,
        name: userinfo.first_name + ' ' + userinfo.last_name,
        username: userinfo.user_name,
        isAdmin: userinfo.role == 1 ? true : false
    };

    return jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

// return basic user details
function getCleanUser(user) {
    let userinput = JSON.parse(user)
    if (!userinput[0]) return null;

    let userinfo = userinput[0]
    return {
        userId: userinfo.user_id,
        name: userinfo.first_name + ' ' + userinfo.last_name,
        username: userinfo.user_name,
        isAdmin: userinfo.role == 1 ? true : false
    };
}

module.exports = {
    generateToken,
    getCleanUser
}