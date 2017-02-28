(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, $window, UserService) {
        var vm = this;
        vm.register = register;

        function init() {
        }

        init();

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    $window.alert( "That username is already taken");
                })
                .error(function() {
                    UserService
                        .createUser(user)
                        .success(function(user){
                            $location.url('/user/' + user._id);
                        })
                        .error(function () {
                            $window.alert("sorry could not register");
                        });
                });
        }
    }
})();