module.exports = function(app){
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    app.post("/api/user/:userId/website",createWebsite);

    var websites=
		[
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    	];
    function findAllWebsitesForUser(req,res) {
        console.log("findAllWebsitesForUser website sevser side");
        var userId=req.params.userId;

        var findWebsites=[]

        for(var i in websites){
            if(websites[i].developerId==userId){
                findWebsites.push(websites[i]);
            }
        }
        res.json(findWebsites);
    }

    function findWebsiteById(req,res) {
        console.log("findWebsiteById website sevser side");
        var websiteId=req.params.websiteId;

        var website=websites.find(function (website) {
            return website._id==websiteId;

        })
        res.json(website);
    }

    function updateWebsite(req,res) {
        var websiteId=req.params.websiteId;

        var newWebsite=req.body;
        console.log("Website server Service updateWebsite.");

        for(var i in websites){
            if(websites[i]._id==websiteId){
                websites[i].description=newWebsite.description;
                websites[i].name=newWebsite.name;
                res.json(websites[i]);
            }
        }
    }

    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id==websiteId){
                websites.splice(i,1);
                res.json(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req,res) {
        var newWebsite=req.body;
        var userId=req.params.userId;

        console.log("Websites Sever Severice createWebsite!");

        newWebsite._id=(new Date()).getTime() + "";
        newWebsite.developerId=userId;
        websites.push(newWebsite);
        res.json(newWebsite);

    }

}