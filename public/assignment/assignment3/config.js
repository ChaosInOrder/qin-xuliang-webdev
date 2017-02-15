(function(){
	angular
		.module("WebAppMaker")
		.config(Config);
		function Config($routeProvider){
			$routeProvider
                .when("/", {
                    redirectTo: '/login'
                })

				.when("/user/:uid/website/:wid/page",{
					templateUrl:"views/page/page-list.view.client.html",
                    controller: "PageListController",
                    controllerAs: "model"
				})
				.when("/user/:uid/website/:wid/page/new",{
					templateUrl:"views/page/page-new.view.client.html",
                    controller: "NewPageController",
                    controllerAs:"model"
				})


                .when("/user/:uid/website/:wid/page/:pid/widget", {
                    templateUrl: "views/widget/templates/widget-list.view.client.html",
                    controller: "WidgetListController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                    templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                    controller: "NewWidgetController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/:wtid", {
                    templateUrl: "views/widget/templates/widget-edit.view.client.html",
                    controller: "EditWidgetController",
                    controllerAs: "model"
                })
				.when("/user/:uid/website/:wid/page/:pid",{
					templateUrl:"views/page/page-edit.view.client.html",
                    controller: "EditPageController",
                    controllerAs: "model"
				});


		}
		
})();