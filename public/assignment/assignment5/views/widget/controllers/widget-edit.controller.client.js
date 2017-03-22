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
        vm.requestFkr=requestFkr;
        function requestFkr() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId+"/fkr");
        }
        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget
                });
        }
        init();


        function updateWidget() {
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    $window.alert("Update Widget");
                })
                .error(function () {
                    $window.alert("Unable to update Widget");
                })

        }

        function deleteWidget() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                WidgetService
                    .deleteWidget(vm.widgetId)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {
                        $window.alert("Unable to delete the widget!");
                    });
            }
        }
    }

})();