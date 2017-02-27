(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);


    function EditPageController($routeParams,$location, $window,PageService) {
        var vm=this;
        vm.userId = $routeParams["uid"];
        vm.websiteId=$routeParams["wid"];
        vm.pageId=$routeParams["pid"];
        vm.deletePage=deletePage;
        vm.updatePage=updatePage;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page=PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            window.alert("Delete Page!");

        }
        function updatePage(page) {
            PageService.updatePage(vm.pageId,page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            window.alert("Update Page Info!");

        }

    }
})();