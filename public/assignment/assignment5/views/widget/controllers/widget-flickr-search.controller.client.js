/**
 * Created by Chaos on 3/22/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($sce, $routeParams, FlickrService, WidgetService,$location) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.getPhotoUrl = getPhotoUrl;
        vm.selectPhoto = selectPhoto;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }
        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .success(function (res) {
                    vm.photos = res.photos;
                });
        }

        function getPhotoUrl(photo) {
            var farm = parseInt(photo.farm);
            var server = parseInt(photo.server);
            var id = parseInt(photo.id);
            var secret = photo.secret;
            var url = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_s.jpg";
            photo.url = url;
            return $sce.trustAsResourceUrl(url);
        }

        function selectPhoto(photo) {
            vm.widget.url = photo.url;
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function (status) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +"/widget/"+vm.widgetId);
                })
                .error(function () {
                    res.sendStatus(404)
                });
        }
    }
})();