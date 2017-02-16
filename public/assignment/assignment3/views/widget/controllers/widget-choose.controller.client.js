(function() {
    angular
        .module("WebAppMaker")
        .controller("ChooseWidgetController", ChooseWidgetController);


    function ChooseWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {

        }

        init();}

})();