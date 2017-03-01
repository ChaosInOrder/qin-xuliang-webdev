(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        function init() {
            var promise= WebsiteService
                .findAllWebsitesForUser(userId);

            promise.success(function (websites) {
                vm.websites=websites;

            })
        }
        init();
    }



})();