(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
    function LoginController($location,UserService) {
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
                vm.error="User doesn't exist!";
            }
        }

    }
});