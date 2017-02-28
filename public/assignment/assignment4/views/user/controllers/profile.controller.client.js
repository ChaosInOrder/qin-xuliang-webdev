(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,$location, $window,UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.deleteUser=deleteUser;
        var userId = $routeParams["uid"];

        function init() {
            var promise= UserService.findUserById(userId);
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

        function deleteUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        console.log("Delete user!")
                        $location.url("/login");
                    })
                    .error(function () {
                        $window.alert('unable to remove user');
                    });
            }

        }
    }
})();