(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location,$window, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;


        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();


        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            window.alert("Update Widget");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            window.alert("Delete Widget!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }

})();