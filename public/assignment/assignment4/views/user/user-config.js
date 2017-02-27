(function(){
	angular
		.module("WebAppMaker")
		.config(UserConfig);
		function UserConfig($routeProvider){
			$routeProvider
                .when("/", {
                    redirectTo: '/login'
                })
                .when("/login", {
                    templateUrl: "views/user/templates/login.view.client.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })

				.when("/register",{
					templateUrl:"views/user/templates/register.view.client.html",
					controller: "RegisterController",
                    controllerAs: "model"
				})
				.when("/user/:uid",{
					templateUrl:"views/user/templates/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model"
				});

		}
		
})();