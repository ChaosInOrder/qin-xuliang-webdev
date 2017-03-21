/**
 * Created by Chaos on 3/21/2017.
 */
module.exports=function () {
    var mongoose=require('mongoose');
    mongoose.Promise=reqire('bluebird');
    var widgetSchema=require('./widget.schema.server');
    var widgetMode=mongoose.model('widgetModel',widgetSchema);
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
        page._websiteId=websiteId;
        return

    }
}