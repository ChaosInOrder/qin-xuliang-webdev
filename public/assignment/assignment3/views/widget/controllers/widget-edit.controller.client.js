(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams,$location,$window,WidgetService) {
        var vm=this;

        //Get information from route
        vm.pageId=$routeParams.pid;
        vm.websiteId=$routeParams.wid;
        vm.userId=$routeParams.uid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            vm.widget=WidgetService.findWidgetById(vm.widgetId);
            console.log("widget-edit controller!");

        }

        init();

        vm.getEditorTemplateUrl = function (str) {
            return 'views/widget/templates/editors/widget-' + str + '-editor.view.client.html';
        }
        vm.updateWidget = function () {
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            window.alert("Update Widget!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        vm.deleteWidget = function () {
            WidgetService.deleteWidget(vm.widgetId);
            window.alert("Delete Widget!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();