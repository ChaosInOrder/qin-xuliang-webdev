/**
 * Created by Chaos on 3/17/2017.
 */
// var q=require("q");

module.exports=function () {
    var mongoose=require('mongoose');
    mongoose.Promise = require('bluebird');
    var websiteSchema=require('./website.schema.server')();
    var websiteModel=mongoose.model("websiteMode",websiteSchema);

    var api={
        "createWebsiteForUser":createWebsiteForUser,
        "findAllWebsitesForUser":findAllWebsitesForUser,
        "updateWebsite":updateWebsite,
        "deleteWebsite":deleteWebsite,
        "findWebsiteById":findWebsiteById,
        "removeWebsites":removeWebsites,
        "addPage":addPage,
        "deletePage":deletePage
    };
    return api;

    function deletePage(websiteId,pageId) {
        return websiteModel.findWebsiteById(websiteId,function (err,website) {
            var index=website.pages.indexOf(pageId);
            website.pages.splice(index,1);
            website.save();
        })
    }
    function addPage(websiteId,pageId) {
        console.log("model addPage");
        return websiteModel.findOne({_id:websiteId})
            .then(function(website) {
            // console.log(user)
            website.pages.push(pageId);
            console.log(website)
            website.save();
        });
    }

    function removeWebsites(websites) {
        console.log(websites)
        return websiteModel.remove({_id:  websites[0]})

    }
    function createWebsiteForUser(userId,website) {
        console.log("model createWebsiteForUser");
        // var deferred=q.defer();
        website._user=userId;
        // console.log(website);
        return websiteModel.create(website);
        //     ,function (err,website) {
        //         if(err){
        //             console.log(err);
        //             deferred.abort(err)
        //         }
        //         else {
        //             deferred.resolve(website);
        //         }
        //     });
        // return deferred.promise;
    }
    function findAllWebsitesForUser(userId) {
        // var deferred=q.defer();
        return websiteModel.find({_user:userId});
        // ,function (err,websites) {
        //         if(err){
        //             deferred.abort(err)
        //         }
        //         else {
        //             deferred.resolve(websites);
        //         }
        //     });
        // return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        // console.log(websiteId)
        return websiteModel.findOne({_id:websiteId});
    }

    function updateWebsite(websiteId,website) {
        delete website._id;
        // var deferred=q.defer();
        console.log("update website model",website)
        websiteModel.update({_id:websiteId}, {$set: website},function (err) {
            console.log(err)
        })
        return websiteModel.findOne({_id:websiteId});
    }
    
    function deleteWebsite(websiteId) {
        // var deferred=q.defer();
        return websiteModel.remove({_id:websiteId});
    }
}