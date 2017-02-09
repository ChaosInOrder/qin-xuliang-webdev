(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
    function LoginController($location,$windows,UserService) {
        var vm=this;

        vm.login=login;

        function init() {

        }
        init();

        function login(user){
            var user=UserService.findUserByCredentials(user.username,user.password);
            if (user){
                $lcoation.url("/user/"+user._id);
            }
            else{
                $window.alert("User doesn't exist!");
            }
        }

    }
});