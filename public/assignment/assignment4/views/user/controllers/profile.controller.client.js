(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $window,UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        var userId = $routeParams["uid"];

        function init() {
            var promise= UserService.findUserById(userId);
            console.log(vm.user);
            promise.success(function (user) {
                vm.user=user;
            });
        }

        init();

        function updateProfile(user) {
            UserService
                .updateUser(userId, user)
                .success(function(user){
                    if(user!=null){
                        $window.alert("Profile update!");
                    }
                    else{
                        $window.alert("Unable to update user!")

                    }
            });


        }
    }
})();