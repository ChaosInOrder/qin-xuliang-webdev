(function(){
	angular
		.module("WebAppMaker")
		.config(Config);
		function Config($routeProvider){
			$routeProvider

                .when("/user/:uid/website/:wid/page/:pid/widget", {
                    templateUrl: "views/widget/widget-list.view.client.html",
                    controller: "WidgetListController",
                    controllerAs: "model"
                })

				.when("/user/:uid/website/:wid/page/:pid/widget/new", {
						templateUrl: "views/widget/widget-choose.view.client.html",
						controller: "NewWidgetController",
						controllerAs: "model"
					})

                .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                    templateUrl: "views/widget/widget-edit.view.client.html",
                    controller: "EditWidgetController",
                    controllerAs: "model"
                 });
		}
		
})();