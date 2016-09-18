var app = angular.module('Twitter', []);

app.controller('Ctrl', function ($scope, $http, StorageService) {

    $scope.tags = [];

    $scope.onEnterHashtag = function (word) {

        for (var key in $scope.tags) {
            if ($scope.tags[key] === word) {
                return
            }
        }
        $scope.tags.push(word);

    };



    StorageService.getTags(function (error, tags) {
        if (error) {
            alert(error.message);

        } else {
            $scope.$apply(function () {
                $scope.tags = tags;
            });
        }
    });


    $scope.saveWords = function () {
        StorageService.saveTags($scope.tags);
        
    }
});
