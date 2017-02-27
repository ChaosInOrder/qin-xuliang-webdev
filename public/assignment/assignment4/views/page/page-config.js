(function(){
	angular
		.module("WebAppMaker")
		.config(PageConfig);
		function PageConfig($routeProvider){
			$routeProvider

				.when("/user/:uid/website/:wid/page",{
					templateUrl:"views/page/templates/page-list.view.client.html",
                    controller: "PageListController",
                    controllerAs: "model"
				})
				.when("/user/:uid/website/:wid/page/new",{
					templateUrl:"views/page/templates/page-new.view.client.html",
                    controller: "NewPageController",
                    controllerAs:"model"
				})

				.when("/user/:uid/website/:wid/page/:pid",{
					templateUrl:"views/page/templates/page-edit.view.client.html",
                    controller: "EditPageController",
                    controllerAs: "model"
				});


		}
		
})();