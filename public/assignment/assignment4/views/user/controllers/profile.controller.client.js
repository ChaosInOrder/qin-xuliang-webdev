(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $window,UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
            console.log(vm.user);
        }

        init();

        function updateProfile(user) {
            var newUser = UserService.updateUser(vm.userId, user);

                $window.alert("Profile update!");

        }
    }
})();