(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);
    function RegisterController($routeParams,UserService) {
        var vm=this;
        var userId=$routePAramas['uid'];
        var user=UserService.findUserById(userId);

        function init() {

        }
        init();

        function updateProfile(user) {
            UserService.updateProfile(userId,user);

        }

    }
});