(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location,$window, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;


        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;
        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget
                });
        }
        init();


        function updateWidget() {
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    $window.alert("Update Widget");
                })
                .error(function () {
                    $window.alert("Unable to update Widget");
                })

        }

        function deleteWidget() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                WidgetService
                    .deleteWidget(vm.widgetId)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {
                        $window.alert("Unable to delete the widget!");
                    });
            }
        }



        // https://devcenter.heroku.com/articles/s3-upload-node
        function getSignedRequest(file) {
            if (file==null){
                return alert("No file upload!");
            }
            const xhr = new XMLHttpRequest();
            xhr.open('GET', "/api/sign-s3?fileName=" + file.name + "&fileType=" + file.type);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        uploadFile(file, response.signedRequest, response.url);
                    }
                    else {
                        alert('Could not get signed URL.');
                    }
                }
            };
            xhr.send();
        };

        function uploadFile(file, signedRequest, url){
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        // document.getElementById('preview').src = url;
                        // document.getElementById('avatar-url').value = url;
                        vm.widget.url=url;
                        WidgetService
                            .updateWidget(vm.widgetId, vm.widget)
                            .success(function (widget) {
                                vm.widget=widget;
                                $window.alert("Update Widget");
                            })
                            .error(function () {
                                $window.alert("Unable to update Widget");
                            })
                    }
                    else{
                        alert('Could not upload file.');
                    }
                }
            };
            xhr.send(file);
        }
    }

})();