(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {


        var api = {
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findWidgetById": findWidgetById,
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "sortWidgets":sortWidgets
        };
        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget",widget);

        }

        function updateWidget(widgetId, widget) {
           return $http.put("/api/widget/"+widgetId,widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function sortWidgets(pageId,initial,final){
            console.log("sort client side");
            return $http.put("/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }
    }
})();