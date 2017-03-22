/**
 * Created by Chaos on 3/22/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhotos" : searchPhotos
        };

        return api;
        function searchPhotos(searchTerm) {
            return $http.get("/api/fkr?searchTerm="+searchTerm);
        }
    }
})();