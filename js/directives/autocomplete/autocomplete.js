app.directive('autocomplete', function ($http) {
    return {

        restrict: 'E',

        scope: {
            ngEnter: '='
        },

        templateUrl: "js/directives/autocomplete/template.html",


        link: function (scope, element, attrs) {

            scope.onChange = function () {
                if (scope.value) {
                    $http.get(
                        'http://words.bighugelabs.com/api/2/f0f43ed427fdbd39f97ef8703e159796/' + scope.value + '/json'
                    ).then(function successCallback(response) {
                        angular.element(document.querySelector(".error")).css("display", "none");
                        scope.bearer = response.data.noun.syn;
                    }, function errorCallback(response) {
                        angular.element(document.querySelector(".scroll")).css("display", "none");
                        scope.bearer = [];
                        scope.nonWords();
                    });
                }
                scope.hid();
            };


            scope.onClickHashtag = function (bar) {

                scope.value = '';
                scope.bearer = [];
                scope.ngEnter(bar);
                angular.element(document.querySelector(".error")).css("display", "none");
                scope.hid();

            };

            scope.nonWords = function () {
                var non = angular.element(document.querySelector(".error"));
                non.css("display", "inline-block")
            };

            scope.hid = function () {
                var quest = angular.element(document.querySelector(".scroll"));
                if (!scope.value) {
                    quest.css("display", "none")
                } else {
                    quest.css("display", "inline-block")
                }
            };
            scope.hid();


        }
    }
});
