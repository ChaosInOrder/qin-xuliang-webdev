(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    function LoginController($location, $window, UserService) {
        var vm = this;
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            if(user.username==null || user.password==null){
                $window.alert("Please input username and password!")
            }
            var user = UserService.findUserByCredentials(user.username,user.password);

            if (user) {
                $location.url("/user/" + user._id);
            } else {
                console.log("Don't have that user!");
                $window.alert("User doesn't exist!");
            }
        }
    }

})();