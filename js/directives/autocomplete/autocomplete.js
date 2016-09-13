app.directive('autocomplete', function ($http, StorageService) {
    return {

        restrict: 'E',

        scope: {
            ngEnter: '='
        },

        templateUrl: "js/directives/autocomplete/template.html",


        link: function (scope, element, attrs) {

            scope.onChange = function () {
                if (scope.value) {
                    StorageService.getWords(scope.value)
                        .success(function (response) {
                            if (!response.noun.syn)return;
                            angular.element(document.querySelector(".error")).css("display", "none");
                            scope.bearer = response.noun.syn;
                        })
                        .error(function (response, status) {

                            angular.element(document.querySelector(".scroll")).css("display", "none");
                            scope.bearer = [];
                            scope.nonWords();
                            scope.ty = response.message;

                        })
                }
                scope.hid();
            };




            scope.onClickHashtag = function (bar) {
                if (!scope.value)return;

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
