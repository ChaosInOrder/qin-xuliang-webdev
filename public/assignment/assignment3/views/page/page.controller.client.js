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