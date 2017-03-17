(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);


    function NewWebsiteController($routeParams, $window,$location,WebsiteService) {
        var vm = this;
        vm.createWebsite=createWebsite;
        vm.userId = $routeParams["uid"];

        function init() {
             WebsiteService
                 .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites=websites;
            })
        }
        init();


        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userId,website)
                .success(function (website) {
                    $location.url("/user/"+website.developerId+"/website");
                    $window.alert("Create new website!")
                })
                .error(function () {
                    $window.alert("Unable to create website!");
                });


        }

    }

})();