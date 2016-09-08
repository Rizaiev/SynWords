app.directive('hashtags', function () {
    return {
        restrict: 'E',

        templateUrl: "js/directives/hashtags/template.html",

        scope: {
            value: '=value'
        },
        
        link: function (scope, elem, attrs) {
            
            scope.deleteTag = function (index) {
                scope.value.splice(index, 1);
            }
        }
    }
});
