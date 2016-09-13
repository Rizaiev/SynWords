app.service('StorageService', ['$http', function ($http, $scope) {


    App42.initialize("0723159bb3cf1183f3c60d00eeabdfeba9ab3217abdf6b5db249041aca5357e9",
        "1c1eb4cfbfd8ebb4b21bb7c6fefc327484a3acd3032ea3ffa26193a91d35ff70");
    var storageService = new App42Storage();
    var dbName = "test",
        collectionName = "foo";

    this.getTags = function (cb) {
        storageService.findAllDocuments(dbName, collectionName, {
            success: function (object) {

                var storageObj = JSON.parse(object);
                var res = storageObj.app42.response.storage.jsonDoc;
                var resLast = res[res.length - 1];
                console.log(resLast.words);

                cb(null, resLast.words)
            }
        });

    };


    this.saveTags = function (tags, cd) {

        var employeeJSON = JSON.stringify({"words": tags}),
         result;

        storageService.insertJSONDocument(dbName, collectionName, employeeJSON, {
            success: function (object) {
                var storageObj = JSON.parse(object);
                result = storageObj.app42.response.storage;
                cd(result);
            },
            error: function (error) {
            }
        });
    };


    this.getWords = function (word) {
        return $http.get('http://words.bighugelabs.com/api/2/f0f43ed427fdbd39f97ef8703e159796/' + word + '/json');
    };


}]);


