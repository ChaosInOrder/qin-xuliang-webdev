(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": 1, "widgetType": "HEADER", "pageId": 1, "size": 2, "text": "GIZMODO"},
            { "_id": 2, "widgetType": "HEADER", "pageId": 1, "size": 4, "text": "Lorem ipsum"},
            { "_id": 3, "widgetType": "IMAGE", "pageId": 1, "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": 4, "widgetType": "HTML", "pageId": 1, "text": "<p>Lorem ipsum</p>"},
            { "_id": 5, "widgetType": "HEADER", "pageId": 1, "size": 4, "text": "Lorem ipsum"},
            { "_id": 6, "widgetType": "YOUTUBE", "pageId": 1, "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": 7, "widgetType": "HTML", "pageId": 1, "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findWidgetById": findWidgetById,
            "findWidgetsByPageId": findWidgetsByPageId
        };
        return api;

        function createWidget(pageId, widget,type) {
            widget._id = widgets.length + 1;
            widget.pageId = pageId;
            widget.widgetType=type;
            widgets.push(widget);
            console.log(widgets)
        }

        function updateWidget(widgetId, widget) {
            widget._id = widgetId;
            for (var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                }
            }
        }

        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    return angular.copy(widgets[i]);
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var res = [];
            for (var i in widgets) {
                if (widgets[i].pageId == pageId) {
                    res.push(widgets[i]);
                }
            }
            return res;
        }
    }
})();