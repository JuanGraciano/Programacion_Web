var user = require('./model/userModel.js');

//Get user by authentication token
exports.getUserByToken = function(req, res) {
    var token = req.body.token || req.params.token || req.query.token || req.headers['x-access-token'];
    user.findOne({
        token: token
    }, function(error, current) {
        if (error) {
            res(error);
        } else{

            res(null, current);
        }
    });
}
