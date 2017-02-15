(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);


    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.widgetTypes = ["HEADER", "HTML", "IMAGE", "YOUTUBE"];

        vm.createWidget = function () {
            WidgetService.createWidget(vm.pageId, vm.widget);
            alert("Widget created!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }


})();