/**
 * Created by Chaos on 3/17/2017.
 */
var q=require("q");

module.exports=function () {
    var mongoose=require('mongoose');
    var websiteSchema=require('./website.schema.server')();
    var websiteModel=mongoose.model("websiteMode",websiteSchema);

    var api={
        "createWebsiteForUser":createWebsiteForUser,
        "findAllWebsitesForUser":findAllWebsitesForUser,
        "findWebsiteById":findWebsiteById,
        "updateWebsite":updateWebsite,
        "deleteWebsite":deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId,website) {
        console.log("model createWebsiteForUser");
        var deferred=q.defer();
        website._user=userId
        websiteModel
            .create(website,function (err,website) {
                if(err){
                    console.log(err);
                    deferred.abort(err)
                }
                else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }
    function findAllWebsitesForUser(userId) {
        var deferred=q.defer();
        websiteModel
            .find({_id:userId},function (err,websites) {
                if(err){
                    deferred.abort(err)
                }
                else {
                    deferred.resolve(websites);
                }
            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred=q.defer();
        websiteModel
            .findOne({_id:websiteId},function (err,website) {
                if(err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(website)
                }
            });
        return deferred.promise;
    }
    function updateWebsite(websiteId,website) {
        var deferred=q.defer();
        websiteId.update(
            {_id:websiteId},
            {$set: website},function (err,website) {
                if(err){deferred.abort(err)}
                else{deferred.resolve(website)};

            }
        );
        return deferred.promise;
    }
    
    function deleteWebsite(websiteId) {
        var deferred=q.defer();
        websiteModel.remove({_id:websiteId},function (err,status) {
            if(err){
                deferred.abort(err);
            }
            else{
                deferred.resolve(status);
            }

        });
        return deferred.promise;
    }
}