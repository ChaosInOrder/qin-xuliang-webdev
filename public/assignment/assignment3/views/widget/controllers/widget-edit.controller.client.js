(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        vm.getEditorTemplateUrl = function (type) {
            return 'views/widget/editor/widget-' + type + '-editor.view.client.html';
        }

        vm.updateWidget = function () {
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            alert("Widget updated!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        vm.deleteWidget = function () {
            WidgetService.deleteWidget(vm.widgetId);
            alert("Widget deleted!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }

})();