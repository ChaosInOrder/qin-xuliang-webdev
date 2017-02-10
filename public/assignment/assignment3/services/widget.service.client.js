(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
    function WidgetService() {
        var widgets = [
            {"_id": 1, "widgetType": "HEADER", "pageId": "1", "size": 4, "text": "Venus Smiled, With a Mysterious Wave Across Its Atmosphere"},
            {
                "_id": 2, "widgetType": "IMAGE", "pageId": "1", "width": "100%",
                "url": "https://static01.nyt.com/images/2017/01/17/science/17tb-venus01/17tb-venus01-master768.jpg"
            },
            {"_id": 3, "widgetType": "HEADER", "pageId": "1", "size": 3, "text": "Top 10 AMAZING Facts About VENUS"},
            {
                "_id": 4, "widgetType": "YOUTUBE", "pageId": "1", "width": "100%",
                "url": "https://www.youtube.com/embed/14gsV5fkhFU"
            }
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
            reutrn widget;

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