;(function() {
    angular
        .module('ng-datetime')
        .directive('ngDatetime', ngDatetime);

        /* ngInject */
        function ngDatetime() {
            return {
                restrict: 'A',
                replace: false,
                require: 'ngModel',
                scope: {
                    format: '@',
                    showType: '@'
                },
                controller: 'NgDatetimeController',
                link: link
            };

            function link(scope, element, attrs, ngModel) {
                scope.ngModel = ngModel;
                scope.$watch('ngModel.$modelValue', scope.changeModel);
            }
        }
})();