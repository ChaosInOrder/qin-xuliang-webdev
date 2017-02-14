(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
       // .controller("NewWidgetController", NewWidgetController)
       // .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams,$sce,WidgetService) {
        var vm=this;

        //Get information from route
        vm.widgetId=$routeParams.witid;
        vm.pageId=$routeParams.pid;
        vm.websiteId=$routeParams.wid;
        vm.userId=$routeParams.uid;

        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        function init() {
            vm.widgets=WidgetService.findWidgetsByPageId(vm.pageId);
            console.log(1)

            //display(vm.widgets);
        }

        init();
        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
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