(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);


    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.pageId = $routeParams["pid"];
        vm.createWidget = createWidget;



        function createWidget(widgetType){
            var newWidget = {"widgetType": widgetType};
            switch (widgetType) {
                case "HEADER":
                    newWidget.size = 1;
                    break;
                case "IMAGE":
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.width = "100%";
                    break;
                default:
            }
            newWidget=WidgetService.createWidget(vm.pageId, newWidget);
            alert("Widget created!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+newWidget._id);
        }
    }

})();