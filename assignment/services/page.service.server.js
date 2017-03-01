module.exports=function (app) {
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);
    app.post("/api/website/:websiteId/page",createPage);



	var pages=
		[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
		]

    function findAllPagesForWebsite(req,res) {
        console.log("findAllPagesForWebsite page sevser side");
        var websiteId=req.params.websiteId;

        var findPages=[]

        for(var i in pages){
            if(pages[i].websiteId==websiteId){
                findPages.push(pages[i]);
            }
        }
        res.json(findPages);
    }

    function findPageById(req,res) {
        console.log("findPageById page sevser side");
        var pageId=req.params.pageId;

        var page=pages.find(function (page) {
            return page._id==pageId;

        })
        res.json(page);
    }

    function updatePage(req,res) {
        var pageId=req.params.pageId;

        var newPage=req.body;
        console.log("Page server Service updatePage.");

        for(var i in pages){
            if(pages[i]._id==pageId){
                pages[i].description=newPage.description;
                pages[i].name=newPage.name;
                res.json(pages[i]);
            }
        }
    }

    function deletePage(req,res) {
        var pageId=req.params.pageId;
        for(var i in pages){
            if(pages[i]._id==pageId){
                pages.splice(i,1);
                res.json(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req,res) {
        var newPage=req.body;
        var websiteId=req.params.websiteId;

        console.log("Pages Sever Severice createPage!");

        newPage._id=(new Date()).getTime() + "";
        newPage.websiteId=websiteId;
        pages.push(newPage);
        res.json(newPage);

    }

}