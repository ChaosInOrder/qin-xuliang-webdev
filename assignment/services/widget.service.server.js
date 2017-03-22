module.exports=function (app,model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget",sortWidgets);




    function uploadImage(req, res) {
        console.log("uploadImage");
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var path = "/uploads/" + req.file.filename;

        for (var i in widgets) {
            if (widgets[i]._id == widgetId) {
                widgets[i].url = path;
                break;
            }
            }

        var redirectURL = "/assignment/assignment4/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        res.redirect(redirectURL);

    }
    function findAllWidgetsForPage(req,res) {
        console.log("findAllWidgetsForPage widget sevser side");
        var pageId=req.params.pageId;

        model.widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets)
            },function (err) {
                res.sendStatus(500).send(err)
            })
    }
    function findWidgetById(req,res) {
        console.log("findWidgetById page sevser side");
        var widgetId=req.params.widgetId;

        model.widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            },function (err) {
                res.sendStatus(500).send(err)
            })
    }
    function updateWidget(req,res) {
        var widgetId=req.params.widgetId;

        var newWidget=req.body;
        console.log("Widget server Service updateWidget.");

        model.widgetModel.updateWidget(widgetId,newWidget)
            .then(function (status) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;

        model.widgetModel.deleteWidget(widgetId)
            .then(function (status) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function createWidget(req,res) {
        var newWidget=req.body;
        var pageId=req.params.pageId;
        model.widgetModel.createWidget(pageId,newWidget)
            .then(function (widget) {
                res.json(widget);
            },function (err) {
                res.sendStatus(500).send(err)
            })

    }

    function sortWidgets(req,res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        // console.log(final=="1")
        model.widgetModel.reorderWidget(pageId,initial,final)
            .then(function (status) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(500).send(err);
            });
    }






}