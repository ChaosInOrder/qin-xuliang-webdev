(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);


    function NewWebsiteController($routeParams, $window,$location,WebsiteService) {
        var vm = this;
        vm.createWebsite=createWebsite;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();


        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId,website);
            $location.url("/user/"+vm.userId+"/website");
            $window.alert("Create new website!");
        }

    }

})();