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
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page=page;
                });
        }
        init();

        function deletePage() {
            window.alert("Delete Page!");
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                PageService
                    .deletePage(vm.pageId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    })
                    .error(function () {
                        $window.alert("Unable to delete the page!");
                    });
            }

        }
        function updatePage(page) {
            PageService
                .updatePage(vm.pageId,page)
                .success(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    $window.alert("Update the page!");
                })
                .error(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    $window.alert("Unable to change the page!");
                });
        }

    }
})();