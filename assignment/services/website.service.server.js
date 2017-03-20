module.exports = function(app,model){
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    app.post("/api/user/:userId/website",createWebsite);

    function findAllWebsitesForUser(req,res) {
        console.log("findAllWebsitesForUser website sevser side");
        var userId=req.params.userId;

        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (findWebsites) {
                res.json(findWebsites);
            });

    }

    function findWebsiteById(req,res) {
        console.log("findWebsiteById website sevser side");
        var websiteId=req.params.websiteId;

        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });
    }

    function updateWebsite(req,res) {
        var websiteId=req.params.websiteId;

        var newWebsite=req.body;
        console.log("Website server Service updateWebsite.");
        model
            .websiteModel
            .updateWebsite(websiteId,newWebsite)
            .then(function (website) {
                res.json(website);
            },function (err) {
                res.send(500).send(404);
            });
    }

    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;
        model.
        websiteModel
            .deleteWebsite(websiteId)
            .then(function () {
                res.send(200);
            },function (err) {
                res.sendStatus(500).sendStatus(404);

            });
    }

    function createWebsite(req,res) {
        var newWebsite=req.body;
        var userId=req.params.userId;

        console.log("Websites Sever createWebsite!");

        model
            .websiteModel
            .createWebsiteForUser(userId,newWebsite)
            .then(
                function (website) {
                    return model.userModel.addWebsite(userId,website);
            })
            .then(
                function (status) {
                    res.sendStatus(200);
                },function (err) {
                    res.sendStatus(500).sendStatus(404);

                }
            );
    }

}