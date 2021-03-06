(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams,$sce,WidgetService) {
        var vm=this;

        //Get information from route
        vm.pageId=$routeParams.pid;
        vm.websiteId=$routeParams.wid;
        vm.userId=$routeParams.uid;

        vm.sortWidgets=sortWidgets;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        //vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        function init() {
            var promise=WidgetService.findAllWidgetsForPage(vm.pageId);

            promise.success(function (widgets) {
                vm.widgets=widgets;
                console.log("find widgets")
            })
            // console.log("widget-controller!");

            //display(vm.widgets);
        }

        init();

        function sortWidgets(initial,final) {
            console.log("sortWidgets controller");
            WidgetService
                .sortWidgets(vm.pageId,initial,final)
                .success(function () {
                    console.log("sort success!")
                    console.log(initial)


                })
                .error(function () {
                    console.log("sort fail");

                })

        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();