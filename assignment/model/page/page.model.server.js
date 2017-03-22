/**
 * Created by Chaos on 3/21/2017.
 */
module.exports=function () {
    var mongoose=require('mongoose');
    mongoose.Promise=require('bluebird');
    var pageSchema=require('./page.schema.server')();
    var pageModel=mongoose.model("pageModel",pageSchema);
    var api={
        "createPage":  createPage,
        "findAllPagesForWebsite":findAllPagesForWebsite,
        "findPageById":findPageById,
        "updatePage":updatePage,
        "deletePage":deletePage,
        "addWidget":addWidget,
        "deleteWidget":deleteWidget

    };
    return api;
    function createPage(websiteId,page) {
        page._website=websiteId;
        return pageModel.create(page);
    }
    function findAllPagesForWebsite(websiteId) {
        // console.log(websiteId)
        return pageModel.find({_website:websiteId});
    }

    function findPageById(pageId) {
        return pageModel.findOne({_id:pageId});

    }
    function updatePage(pageId,page) {
        // console.log("model page",page)
        delete page._id;
        pageModel.update({_id:pageId}, {$set: page},function (err) {
            console.log(err)
        })
        return pageModel.findOne({_id:pageId});

    }

    function deletePage(pageId) {
        return pageModel.remove({_id:pageId});

    }

    function deleteWidget(pageId,widgetId) {
        return pageModel.findPageById(pageId,function (err,page) {
            var index=page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            page.save();
        })
    }
    function addWidget(pageId,widget) {
        return pageModel.findPageById(pageId,function (err,page) {
            // console.log(user)
            page.widgets.push(widget);
            page.save();

        });
    }
};