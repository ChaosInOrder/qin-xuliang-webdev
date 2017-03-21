/**
 * Created by Chaos on 3/15/2017.
 */

// var q=require("q");
module.exports=function () {
  var mongoose=require('mongoose');
  var userSchema=require('./user.schema.server')();
  mongoose.Promise = require('bluebird');
  var userModel=mongoose.model("userModel",userSchema);

    var api={
        "createUser": createUser,
        "findUserById": findUserById,
        "findUserByUsername": findUserByUsername,
        "findUserByCredentials": findUserByCredentials,
        "updateUser": updateUser,
        "deleteUser": deleteUser,
        "addWebsite":addWebsite,
        "deleteWebsite":deleteWebsite
    };
    return api;

    function deleteWebsite(userId,websiteId) {
        return userModel.findUserById(userId,function (err,user) {
                var index=user.websites.indexOf(websiteId);
                user.websites.splice(index,1);
                user.save();
            })
    }
    function addWebsite(userId,websiteId) {
        console.log("model addWebsite");
        return userModel.findById(userId,function (err,user) {
                    // console.log(user)
                    user.websites.push(websiteId);
                    user.save();

                });
    }
    function createUser(user) {
        return userModel.create(user);
    }
    
    function findUserById(userId) {
        return userModel.findOne({_id:userId});
        
    }
    function deleteUser(userId) {
        // var deferred=q.defer();
        return userModel.remove({_id:userId});

    }

    function findUserByUsername(username) {
        // var deferred=q.defer();
        return userModel.findOne({username:username});
        // return deferred.promise;

    }

    function findUserByCredentials(username,password){
        // var deferred=q.defer();
        return userModel.findOne({
                username:username,
                password:password
            });
        // return deferred.promise;

    };

    function updateUser(userId,user) {
        // var deferred=q.defer();
        return userModel.update(
            {_id:userId},
            {
                firstName:user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        );
        // return deferred.promise;
    }

};