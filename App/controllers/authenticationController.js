var express = require('express');
var jwt = require('jsonwebtoken');
var error = require('../messages.js');
var apiRoutes = express.Router();
var user = require('../model/userModel.js');

var errorToken = error.token;
var warning = error.warning;
var success = error.success;
var errorDatabase = error.database;
var errorUser = error.user;

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIl9pZCI6IjU5NzUxMjE2OGFjNDBhMzExNGQ1ZDFkOSIsIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InRva2VuIjoibW9kaWZ5IiwiX2lkIjoiZGVmYXVsdCIsImVtYWlsIjoibW9kaWZ5IiwicGFzc3dvcmQiOiJtb2RpZnkiLCJ1c2VybmFtZSI6Im1vZGlmeSJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6eyJfaWQiOnRydWV9LCJpbml0Ijp7fSwibW9kaWZ5Ijp7ImVtYWlsIjp0cnVlLCJ0b2tlbiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlfSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwicGF0aHNUb1Njb3BlcyI6e30sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3Ijp0cnVlLCJfZG9jIjp7InRva2VuIjoiIiwiX2lkIjoiNTk3NTEyMTY4YWM0MGEzMTE0ZDVkMWQ5IiwiZW1haWwiOiJzb3ltZW5vbEBjYWxsZS5jb20iLCJwYXNzd29yZCI6Im1lbm9yIiwidXNlcm5hbWUiOiJFbCBzdWpldG8ifSwiaWF0IjoxNTAwODQ0NTY2LCJleHAiOjE1MDA5MzA5NjZ9.I2FmCBXdDDkYYU7KsLBPbozyw7_FE2vsdz0TnKhaL0c

*/
module.exports = function(app) {

    tokenProove = function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.params.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there     is no token
            // return an error
            return res.status(401).send({
                success: false,
                message: 'No token provided.'
            });

        }
    };

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    authenticate = function(req, res) {
        // find the user
        console.log(req.body);
        user.findOne({
            email: req.body.email
        }, function(err, currentUser) {
            if (err) throw err;
            if (!currentUser) {
                res.status(errorUser.userNotFound[0]).json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (currentUser) {
                // check if password matches
                if (currentUser.password != req.body.password) {
                    res.status(errorUser.Unauthorized[0]).json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

                    // if user is found and password is right
                    // create a token
                    currentUser.token = 0;
                    currentUser.token = jwt.sign(currentUser, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    //link user with token

                    currentUser.save(function(err) {
                        if (err) return res.send(500, err.message);
                    });
                    // return the information including token as JSON
                    res.status(success.ok).json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: currentUser.token,
                        username: currentUser.username,
                        _id : currentUser._id,
                        email: currentUser.email
                    });
                }
            }
        });
    };
};
