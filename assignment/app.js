module.exports = function (app) {
    console.log("WebMaker Server Side");
    model=require("./model/models.server")();
    require("./services/user.service.server")(app,model);
    require("./services/website.service.server")(app,model);
    require("./services/page.service.server")(app,model);
    require("./services/widget.service.server")(app,model);
}