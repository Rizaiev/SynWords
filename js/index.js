var app = angular.module('Twitter', []);

app.controller('Ctrl', function ($scope, $http) {

    $scope.tags = [];

    $scope.onEnterHashtag = function (word) {

        for (var key in $scope.tags) {
            if ($scope.tags[key] === word) {
                return
            }
        }
        $scope.tags.push(word);
        
    };

    $scope.getLastSave = function () {

        App42.initialize("0723159bb3cf1183f3c60d00eeabdfeba9ab3217abdf6b5db249041aca5357e9",
            "1c1eb4cfbfd8ebb4b21bb7c6fefc327484a3acd3032ea3ffa26193a91d35ff70");

        var storageService = new App42Storage();
        var dbName = "test",
            collectionName = "foo";

        storageService.findAllDocuments(dbName, collectionName, {
            success: function (object) {

                var storageObj = JSON.parse(object);
                var res = storageObj.app42.response.storage.jsonDoc;
                var resLast = res[res.length - 1];
                
                $scope.$apply(function () {
                    $scope.tags = resLast.words;
                });
            },
            error: function (error) {
            }
        });
    };

    $scope.getLastSave();

//TODO переобразование в json

    $scope.saveWords = function () {

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
               
            },
            error: function (error) {
            }
        });
    };
});

