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
        }
        init();

        function createPage(page) {
            PageService
                .createPage(vm.websiteId,page)
                .success(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+page._website+"/page");
                    window.alert("Create New Page!");
                })
                .error(function () {
                    $window.alert("Unable to create page!");
                });


        }



    }

})();