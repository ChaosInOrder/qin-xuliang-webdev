module.exports = function (app) {
    console.log("WebMaker Server Side");
    require("./services/user.service.server")(app);
   //require("./services/website.service.server")(app);
   //require("./services/page.service.server")(app);
    //require("./services/widget.service.server")(app);
}