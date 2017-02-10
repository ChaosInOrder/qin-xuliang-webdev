(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId=$routeParams["wid"]
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, $window,$location,PageService) {
        var vm = this;

        function init() {
        }
        init();



    }

    function EditPageController($routeParams,$location, $window,PageService) {
        var vm = this;


        function init() {
        }
        init();


    }
})();