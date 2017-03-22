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
        widget.size=1
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
        return widgetModel.findOne({_id:widgetId})
            .then(function (widget) {
                return widgetModel.find({_page:widget._page},function (err,widgets) {
                    // console.log("origin delete",widget)
                    moveUp(widgets,widget.index,widgets.length);
                    // console.log("after move up",widgets)
                    widget.remove()
                })
            });

    }
    function reorderWidget(pageId,start,end) {
        var s=parseInt(start);
        var f=parseInt(end);
        return widgetModel.find({_page:pageId},function (err,widgets) {
            if(s>f){moveDown(widgets,s,f)}
            else if (s<f){moveUp(widgets,s,f)}
        });


    }
    function moveUp(widgets,s,f) {
        for(var i in widgets){
            if(widgets[i].index>s && widgets[i].index<=f){
                widgets[i].index -= 1;
                widgets[i].save();
                // console.log("move up",widgets[i]);
            }
            else if(widgets[i].index==s){
                // console.log("final position",f)
                widgets[i].index=f;
                widgets[i].save();
                // console.log("delete widget after save",widgets[i])
            }
        }

    }

    function moveDown(widgets,s,f) {
        for(var i in widgets)
        {
            if(widgets[i].index<s && widgets[i].index>=f)
            {
                widgets[i].index += 1;
                widgets[i].save();
            }
            else if(widgets[i].index==s)
            {
                widgets[i].index=f;
                widgets[i].save();
            }
        }

    }
}