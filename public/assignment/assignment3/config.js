(function(){
	angular
		.module("WebAppMaker")
		.config(Config);
		function Config($routeProvider){
			$routeProvider
                .when("/",{
                	redirectTo: '/login'
			})
				.when("/login",{
					templateUrl:"views/user/login.view.client.html",
					controller:"LoginController",
					controllerAs:"model"
				})

				.when("/register",{
					templateUrl:"views/user/register.view.client.html",
					controller: "RegisterController",
                    controllerAs: "model"
				})
				.when("/user/:uid",{
					templateUrl:"views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model"
				})
				.when("/user/:uid/website",{
					templateUrl:"views/website/website-list.view.client.html"
				})
				.when("/user/:uid/website/new",{
					templateUrl:"views/website/website-new.view.client.html"
				})
				.when("/user/:uid/website/:wid",{
					templateUrl:"views/website/website-edit.view.client.html"
				})
				.when("/user/:uid/website/:wid/page",{
					templateUrl:"views/page/page-list.view.client.html"
				})
				.when("/user/:uid/website/:wid/page/new",{
					templateUrl:"page-new.view.client.html"
				})
				.when("/user/:uid/website/:wid/page/:pid",{
					templateUrl:"page-edit.view.client.html"
				});



		}
		
})();