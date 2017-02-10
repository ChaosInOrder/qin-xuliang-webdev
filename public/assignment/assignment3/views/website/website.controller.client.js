(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    function LoginController($location, $window, UserService) {
        var vm = this;
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            var user = UserService.findUserByCredentials(user.username,user.password);

            if (user) {
                $location.url("/user/" + user._id);
            } else {
                console.log("Don't have that user!");
                $window.alert("User doesn't exist!");
            }
        }
    }

    function RegisterController($location, $window, UserService) {
        var vm = this;
        vm.register = register;

        function init() {
        }

        init();

        function register(user) {
            if (user.password != user.passwordCheck) {
                $window.alert("Password does not match, please re-enter!");
            } else {
                var newUser = {_id:"", username:"", password:""};
                newUser.username = user.username;
                newUser.password = user.password;
                newUser = UserService.createUser(newUser);
                if (newUser) {
                    $location.url("/user/"+newUser._id);
                }
            }
        }
    }

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