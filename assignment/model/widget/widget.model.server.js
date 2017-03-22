/**
 * Created by Chaos on 3/21/2017.
 */
module.exports=function () {
    var mongoose=require('mongoose');
    mongoose.Promise=require('bluebird');
    var widgetSchema=require('./widget.schema.server')();
    var widgetModel=mongoose.model("widgetModel",widgetSchema);
    var api={
        "createWidget":  createWidget,
        "findAllWidgetsForPage":findAllWidgetsForPage,
        "findWidgetById":findWidgetById,
        "updateWidget":updateWidget,
        "deleteWidget":deleteWidget,
        "reorderWidget":reorderWidget

    };
    return api;
    function createWidget(pageId,widget) {
        widget._page=pageId;
        return widgetModel.find({_page:pageId})
            .then(function (widgets) {
                widget.index=widgets.length;
                return widgetModel.create(widget);
                }
            )
    }
    function findAllWidgetsForPage(pageId) {
        return widgetModel.find({_page:pageId});
    }
    function findWidgetById(widgetId) {
        return widgetModel.findOne({_id:widgetId});
    }
    function updateWidget(widgetId,widget) {
        delete widget._id;
        return widgetModel.update({_id:widgetId}, {$set: widget})
    }
    function deleteWidget(widgetId) {
        return widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                return widgetModel.findAllWidgetsForPage(widget._page)
                    .then(function (widgets) {
                        return widgetModel.reorderWidget(widget._page,widget.index,widgets.length)
                            .then(function (status) {
                                widget.remove();
                            },function (err) {
                                console.log(err)
                            })
                    })

            });

    }
    function reorderWidget(pageId,start,end) {
        return widgetModel.find({_page:pageId})
            .then(function (widgets) {
                for(var i in widgets){
                    if (initial < final && widgets[i].index > initial && widgets[i].index <= final && widgets[i].pageId == pageId) {
                        widgets[i].index -= 1;
                        widgets[i].save()
                    }

                    else if(initial > final && widgets[i].index < initial && widgets[i].index >= final && widgets[i].pageId == pageId) {
                        widgets[i].index += 1;
                        widgets[i].save();
                    }

                    else if (widgets[i].index == initial && widgets[i].pageId == pageId) {
                        widgets[i].index = parseInt(final);
                        widgets[i].save();
                    }
                }
            },function (err) {

            })

    }
}