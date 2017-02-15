(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams,$location,$window,WidgetService) {
        var vm=this;
        vm.createWidget=createWidget;
        //Get information from route
        vm.pageId=$routeParams.pid;
        vm.websiteId=$routeParams.wid;
        vm.userId=$routeParams.uid;
        vm.widgetId = $routeParams.wgid;


        function init() {
        }

        init();

        function createWidget(widget) {
            vm.widget=WidgetService.createWidget(vm.pageId,widget);
            window.alert("Create New Widget!");
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();