(function(){
	angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);
    function ProfilerController($routeParams,UserService) {
        var vm=this;
	    var userId=$routePAramas['uid'];

        function init() {

            var user=UserService.findUserById(userId);
        }
        init();

        function updateProfile(user) {
            UserService.updateProfile(userId,user);

        }

    }
});