(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);


    function EditWebsiteController($routeParams,$location, $window,WebsiteService) {
        var vm = this;
        //vm.websiteId = $routeProvider.websiteId;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites=websites;
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                        vm.website=website;
                    });
        }
        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .success(function (website) {
                    $location.url("/user/"+website.developerId+"/website/"+website._id);
                    $window.alert("Update the website!");
                })
                .error(function (website) {
                    $location.url("/user/"+website.developerId+"/website/"+website._id);
                    $window.alert("Unable to change the website!");
                });

        }

        function deleteWebsite() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                WebsiteService
                    .deleteWebsite(vm.websiteId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website");
                    })
                    .error(function () {
                        $window.alert("Unable to delete the website!");
                    });
            }

        }

    }
})();