(function () {
    angular
        .module("wbdvDirectives ",[])
        .directive('wbdvSortable',sortableDir);
    
    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            var initial = -1, final = -1;
            $(element)
                .find(".wbdv-sortable")
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        initial = ui.item.index()
                        console.log(initial);
                    },
                    stop: function (event, ui) {
                        final = ui.item.index();
                        scope.callback({initial: initial, final: final});
                    }
                });

            console.log("Sortable server side!");

        }
        return {
            templateUrl: "views/widget/sorted-widgets.view.client.html",
            scope: {
                model: "=data",
                callback: "&"
            },
            link: linkFunc
        }
        
    }

})();