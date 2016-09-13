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

//TODO переобразование в json

    $scope.saveWords = function () {
        
        console.log('1');
        StorageService.saveTags($scope.tags, function (a) {
            console.log(a);
        });
        
    }
});
/*$scope.saveWords = function () {

 App42.initialize("0723159bb3cf1183f3c60d00eeabdfeba9ab3217abdf6b5db249041aca5357e9",
 "1c1eb4cfbfd8ebb4b21bb7c6fefc327484a3acd3032ea3ffa26193a91d35ff70");


 var storageService = new App42Storage();
 var dbName = "test",
 collectionName = "foo",
 employeeJSON = JSON.stringify({"words": $scope.tags});

 var result;

 storageService.insertJSONDocument(dbName, collectionName, employeeJSON, {
 success: function (object) {
 var storageObj = JSON.parse(object);
 result = storageObj.app42.response.storage;
 console.log(result);
 },
 error: function (error) {
 }
 });
 };
 });*/

