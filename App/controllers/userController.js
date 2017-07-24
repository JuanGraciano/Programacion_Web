var user = require('../model/userModel.js');
var jwt = require('jsonwebtoken');
var utility = require("../utility.js");
var error = require('../messages.js');
var errorToken = error.token;
var errorUser = error.user;
var warning = error.warning;
var success = error.success;
var errorDatabase = error.database;

/*
{
  "username": "El sujeto",
  "password": "menor",
    "email": "soymenol@calle.com"

}
*/

module.exports = function(app) {

  //GET - Return all users in the DB
  findAllUsers = function(req, res) {
    console.log(req.params.email);
    user.find(function(err, current) {
      if (err){
        res.status(errorUser.userEmpty[0].send(errorUser.userEmpty[0]));
      }
      else {
        console.log('GET /users');
        res.status(success.ok).json(current);
      }
    });
  };

  //Get current user
  getCurrentUser = function(req, res) {
    utility.getUserByToken(req, function(error, current) {
      if(error){
        res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[0]);
      }
      else{
        res.status(success.ok).json({
          id: current.username,
          status: current.status,
          role: current.role
        });
      }
    });
  };

  //GET - Return a user with specified ID
  findUserByEmail = function(req, res) {
    console.log(req.params.email);
    user.find({email: req.params.email}, function(err, current) {
      if (err) {
        console.log('ta vacio');
        res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1]);
      }
      else {
        console.log(current);
        if(current != [] || current != null){
          // console.log('GET /users/' + req.params.email);
          res.status(success.ok).json(current);
          
        }
        else{
          console.log('ta vacio');
          res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1]);
        }
      }
    });
  };

  //POST - Insert a new user in the DB
  addUser = function(req, res) {
    console.log(req.body);
    user.findOne({'email': req.body.email}, function(err, current) {
      if(err){
        res.status(warning.badRequest[0]).send(err);
      }
      if (current != null){
        res.status(errorUser.userExist[0]).send(errorUser.userExist[1]);
      }
      else {
        console.log('POST');
        console.log(req.body.password)
        var newUserObj = new user({
          username: req.body.username,
          password: req.body.password,
          token : "",
          email: req.body.email
        });

        newUserObj.token = jwt.sign(newUserObj, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    }),
        newUserObj.save(function(err, resultObj) {
          if (err){
            res.status(errorDatabase.create[0]).send(errorDatabase.create[1]);
          }
          else{
            res.status(success.created).json({
                        success: true,
                        token: resultObj.token,
                        username: resultObj.username,
                        _id : resultObj._id,
                        email: resultObj.email
                    });
          }
        });
      }
    });
  };

  //PUT - Update a register already exists
  updateUser = function(req, res) {
    utility.getUserByToken(req, function(error, current) {
      if(error){
        res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1])
      }
      // else{
      //   // switch(current.role) {

      //     case(roles.superadmin || roles.admin): 
      //       console.log('PUT /users/' + req.body.id);
      //       user.findById(req.body.id, function(error, userObj) {
      //         if(error){
      //           res.status(warning.notFound[0]).json(warning.notFound[1]);
      //         }
      //         else{
      //           var keys = Object.keys(req.body);
      //           keys.forEach(key => {
      //             if(key != "id" && key != "token" && key != "username" ){
      //               userObj[key] = req.body[key];
      //             }
      //           });
      //         };
      //         userObj.save(function(err, resultObj) {
      //           if(err){
      //             res.status(errorDatabase.update[0]).json(errorDatabase.update[1]);
      //           }
      //           else{
      //             res.status(success.ok).json(resultObj);
      //           }
      //         });
      //       });
      //       break;

      //     case(roles.vendor):
      //       var keys = Object.keys(req.body);
      //       keys.forEach(key => {
      //         if(key != "id" && key != "token" && key != "username" ){
      //           current[key] = req.body[key];
      //         }
      //       });
      //       current.save(function(err, resultObj) {
      //         if(err){
      //           res.status(errorDatabase[0]).json({result: false});
      //         }
      //         else{
      //           res.status(success.ok).json({result: true});
      //         };
      //       });
      //       break;
          
      //     defaul:
      //       res.status(warning.methodNotAllow[0]).send(warning.methodNotAllow[1]);
      //       break;
      //   }
      // };
    });
  };

  //DELETE - Delete a user with specified ID
  deleteUser = function(req, res) {
    utility.getUserByToken(req, function(current, error){
      if(error){
        res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1])
      }
      else{
        if(current.role == roles.admin || current.role == roles.superadmin){
          if(current.id == req.params.id){
            res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
          }
          else{
            user.findByIdAndRemove(req.params.id, function(err) {
              if (err){
                res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1]);
              }
              else { 
                res.status(success.ok).send("User with the id " + req.params.id + " Deleted");
              }
            });
          }
        }
        else{
          res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
        }
      }
    })
  };

  //SHOW - Show sing in
  showSingIn = function(req, res){
    res.render('signIn');
  };

  //SHOW - Show sing up
  showSingUp = function(req, res){
    res.render('signUp');
  };

};
