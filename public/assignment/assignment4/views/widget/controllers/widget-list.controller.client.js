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

        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        //vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        function init() {
            var promise=WidgetService.findAllWidgetsForPage(vm.pageId);

            promise.success(function (widgets) {
                vm.widgets=widgets;
            })
            // console.log("widget-controller!");

            //display(vm.widgets);
        }

        init();

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
        // function display(widgets) {
        //     for(var i in widgets){
        //         if(widgets[i].widgetType=="Youtube" || widgets[i]=="Header"){
        //             widgets[i].Url=$sce.trustResourceUrl(widgets[i].url);
        //         }
        //     }
        //
        // }
    }
})();