app.directive('autocomplete', function ($http, WordDatabaseService) {
    return {

        restrict: 'E',

        scope: {
            ngEnter: '='
        },

        templateUrl: "js/directives/autocomplete/template.html",


        link: function (scope, element, attrs) {

            scope.onChange = function () {
                if (scope.value) {
                    WordDatabaseService.getWords( scope.value, function (error, words) {
                        if(words){
                            scope.bearer = words;
                            angular.element(document.querySelector(".error")).css("display", "none");
                        } else {
                            angular.element(document.querySelector(".scroll")).css("display", "none");
                            scope.bearer = [];
                            scope.nonWords();
                        }
                        
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
