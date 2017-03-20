module.exports=function (app) {


    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.put("/api/page/:pageId/widget",sortWidgets);
    app.get("/api/sign-s3", signS3);


    var widgets=
        [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO","index":0},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum","index":1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/","index":2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>2Lorem ipsum</p>","index":3},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum","index":4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" ,"index":5},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>","index":6}
    ]



    function signS3(req, res) {
        console.log("s3 server")
        var aws = require('aws-sdk');
        var s3 = new aws.S3();
        var S3_BUCKET = process.env.S3_BUCKET_NAME;

        const fileName = req.query.fileName;
        console.log(fileName);
        const fileType = req.query.fileType;
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3Params, function(err, data) {
            if(err){
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: "https://"+S3_BUCKET+".s3.amazonaws.com/"+fileName
            };
            res.write(JSON.stringify(returnData));
            console.log(returnData);
            res.end();
        });}


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
                var deletePageId=widgets[i].pageId;
                var deleteWidgetIndex=widgets[i].index;
                widgets.splice(i,1);
            }
        }
        for(var i in widgets){
            if(widgets[i].pageId==deletePageId && widgets[i].index>deleteWidgetIndex){
                widgets[i].index=widgets[i].index-1;
            }
        }
        res.json(200);
    }

    function createWidget(req,res) {
        var newWidget=req.body;
        var pageId=req.params.pageId;
        var maxIndex=-1;

        // for(var i in widgets){
        //     if(maxIndex<=widgets[i].index && widgets[i].pageId==pageId){
        //         maxIndex=widgets[i].index;
        //
        //     }
        // }
        // newWidget.index=parseInt(maxIndex);
        newWidget.index = 0;
        for (var i in widgets) {
            if (widgets[i].pageId == pageId) {
                newWidget.index += 1;
            }
        }
        console.log("Widgets Sever Severice createWidget!");
        newWidget._id=(new Date()).getTime() + "";
        newWidget.pageId=pageId;
        widgets.push(newWidget);
        // console.log(widgets);
        res.json(newWidget);

    }

    function sortWidgets(req,res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        // console.log(final=="1")
        for(var i in widgets){
            if (initial < final && widgets[i].index > initial && widgets[i].index <= final && widgets[i].pageId == pageId) {
                    widgets[i].index -= 1;
                }

            else if(initial > final && widgets[i].index < initial && widgets[i].index >= final && widgets[i].pageId == pageId) {
                    widgets[i].index += 1;
                }

            else if (widgets[i].index == initial && widgets[i].pageId == pageId) {
                    widgets[i].index = parseInt(final);
            }
        }

        res.sendStatus(200);
    }






}