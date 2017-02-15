(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
    function WidgetService() {
        var widgets = [
            { "_id": "1", "widgetType": "heading", "pageId": "1", "size": 2, "text": "GIZMODO"},
            { "_id": "2", "widgetType": "heading", "pageId": "1", "size": 4, "text": "Lorem ipsum"},
            { "_id": "3", "widgetType": "image", "pageId": "1", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "4", "widgetType": "html", "pageId": "1", "text": "<p>Lorem ipsum</p>"},
            { "_id": "5", "widgetType": "heading", "pageId": "1", "size": 4, "text": "Lorem ipsum"},
            { "_id": "6", "widgetType": "youtube", "pageId": "1", "width": "100%","height":"600px",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "7", "widgetType": "html", "pageId": "1", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId,widget) {
            widget._id=widgets.length+1;
            widget.pageId=pageId;
            widgets.push(widget);
            return widget;

        }

        function findWidgetsByPageId(pageId) {
            res=[]
            for(var i in widgets){
                if(widgets[i].pageId==pageId)
                    res.push(widgets[i]);

            }
            return res;

        }

        function findWidgetById(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id=widgetId)
                    return widgets[i];

            }
            return null;

        }

        function updateWidget(widgetId,widget) {
            for(var i in widgets){
                if(widgets[i]._id=widgetId)
                    widgets[i]=widget;
                return widget;

            }

        }

        function deleteWidget(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id=widgetId)
                    widgets.splice(i,1);

            }

        }
    }
})();