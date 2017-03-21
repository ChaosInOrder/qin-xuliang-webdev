module.exports=function (app,model) {
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);
    app.post("/api/website/:websiteId/page",createPage);



    function findAllPagesForWebsite(req,res) {
        console.log("findAllPagesForWebsite page sevser side");
        var websiteId=req.params.websiteId;

        model.pageModel.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                // console.log(pages);
                res.json(pages);
            },function (err) {
                res.sendStatus(500).send(404);

            })
    }

    function findPageById(req,res) {
        console.log("findPageById page sevser side");
        var pageId=req.params.pageId;

       model.pageModel.findPageById(pageId)
           .then(function (page) {
               res.json(page);
           },function (err) {
               res.sendStatus(500).send(err);

           })
    }

    function updatePage(req,res) {
        var pageId=req.params.pageId;

        var newPage=req.body;
        console.log("Page server Service updatePage.");
        console.log("controller page",newPage)
        model.pageModel.updatePage(pageId,newPage)
            .then(function (page) {
                console.log("call back page",page)
                res.json(page);
            },function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function deletePage(req,res) {
        var pageId=req.params.pageId;
        model.pageModel.deletePage(pageId)
            .then(function (status) {
                res.send(status);
            },function (err) {
                res.sendStatus(500).sendStatus(404);

            })
    }

    function createPage(req,res) {
        var newPage=req.body;
        var websiteId=req.params.websiteId;

        console.log("Pages Sever Severice createPage!");

        model.pageModel.createPage(websiteId,newPage)
            .then(function (page) {
                model.websiteModel.addPage(websiteId,page._id);
                res.json(page)

            })

    }

}