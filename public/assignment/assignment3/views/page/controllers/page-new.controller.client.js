(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);
 
    function NewPageController($routeParams, $window,$location,PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId=$routeParams["wid"];
        vm.pageId=$routeParams["pid"];
        vm.createPage=createPage;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage(page) {
            PageService.createPage(vm.websiteId,page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            window.alert("Create New Page!");

        }



    }

})();