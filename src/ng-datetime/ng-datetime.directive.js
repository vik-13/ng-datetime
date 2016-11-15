;(function() {
    angular
        .module('ng-datetime')
        .directive('ngDatetime', ngDatetime);

        /* ngInject */
        function ngDatetime() {
            return {
                restrict: 'E',
                replace: false,
                scope: {
                    date: '@'
                },
                controller: 'NgDatetimeController as $ctrl',
                templateUrl: 'ng-datetime.tpl.html'
            };
        }
})();