(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);


    function NewWebsiteController($routeParams, $window,$location,WebsiteService) {
        var vm = this;
        vm.createWebsite=createWebsite;
        var userId = $routeParams["uid"];

        function init() {
             WebsiteService
                 .findAllWebsitesForUser(userId)
                .success(function (websites) {
                    vm.websites=websites;


            })
        }
        init();


        function createWebsite(website) {
            WebsiteService
                .createWebsite(userId,website)
                .success(function (website) {
                    $location.url("/user/"+website.developerId+"/website");
                    $window.alert("Create new website!");
                })
                .error(function () {
                    $window.alert("Unable to create website!");
                })


        }

    }

})();