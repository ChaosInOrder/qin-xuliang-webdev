/**
 * Created by Chaos on 3/15/2017.
 */

// var q=require("q");
module.exports=function () {
  var mongoose=require('mongoose');
  var userSchema=require('./user.schema.server')();
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
        var deferred=q.defer();
        userModel
            .findUserById(userId,function (err,user) {
                var index=user.websites.indexOf(websiteId);
                user.websites.splice(index,1);
                user.save();
                deferred.resolve(user);
            })
        return deferred.promise;
    }
    function addWebsite(userId,website) {
        console.log("model addWebsite");
        return userModel
                .findUserById(userId,function (err,user) {
                    console.log(user);
                    user.websites.push(website);
                    user.save();
                });
    }
    function createUser(user) {
        var deferred=q.defer();
        console.log("model create user");
        console.log(user);
        return userModel
            .create(user,function (err,user) {
                if(err){
                    deferred.abort(err)
                }
                else {
                    deferred.resolve();
                }
            });
        // console.log(deferred.promise);
        // return deferred.promise;
    }
    
    function findUserById(userId) {
        var deferred=q.defer();
        console.log("model findUserById");
        userModel
            .findOne({_id:userId},function (err,user) {
                if(err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(user)
                }
            });
        return deferred.promise;
        
    }
    function deleteUser(userId) {
        var deferred=q.defer();
        userModel.remove({_id:userId},function (err) {
            if(err){
                deferred.abort(err);
            }
            else{
                deferred.resolve(); 
            }
            
        });

    }

    function findUserByUsername(username) {
        var deferred=q.defer();
        userModel.findOne({username:username},function (err,user) {
            if(err){deferred.abort(err)}
            else{deferred.resolve(user)};
        })
        return deferred.promise;

    }

    function findUserByCredentials(username,password){
        var deferred=q.defer();
        userModel.findOne({
            username:username,
            password:password
        },function (err,user) {
            if(err){deferred.abort(err)}
            else{deferred.resolve(user)};
        });
        return deferred.promise;

    };

    function updateUser(userId,user) {
        var deferred=q.defer();
        userModel.update(
            {_id:userId},
            {
                firstName:user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            },function (err,user) {
                if(err){deferred.abort(err)}
                else{deferred.resolve(user)};

            }
        );
        return deferred.promise;
    }

};