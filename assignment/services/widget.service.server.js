module.exports=function (app) {
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/page/:pageId/widget",createWidget);

    var widgets=
        [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]
    function findAllWidgetsForPage(req,res) {
        console.log("findAllWidgetsForPage widget sevser side");
        var pageId=req.params.pageId;

        var findWidgets=[]

        for(var i in widgets){
            if(widgets[i].pageId==pageId){
                findWidgets.push(widgets[i]);
            }
        }
        //console.log(findWidgets);
        res.json(findWidgets);
    }
    function findWidgetById(req,res) {
        console.log("findWidgetById page sevser side");
        var widgetId=req.params.widgetId;

        var widget=widgets.find(function (widget) {
            return widget._id==widgetId;

        })
        res.json(widget);
    }
    function updateWidget(req,res) {
        var widgetId=req.params.widgetId;

        var newWidget=req.body;
        console.log("Widget server Service updateWidget.");

        for(var i in widgets){
            if(widgets[i]._id==widgetId){
                widgets[i]=newWidget;
                res.json(widgets[i]);
            }
        }
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id==widgetId){
                widgets.splice(i,1);
                res.json(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWidget(req,res) {
        var newWidget=req.body;
        var pageId=req.params.pageId;

        console.log("Widgets Sever Severice createWidget!");

        newWidget._id=(new Date()).getTime() + "";
        newWidget.pageId=pageId;
        widgets.push(newWidget);
        console.log(widgets);
        res.json(newWidget);

    }



}