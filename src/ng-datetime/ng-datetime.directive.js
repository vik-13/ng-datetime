;(function() {
    angular
        .module('ng-datetime')
        .directive('ngDatetime', ngDatetime);

        /* ngInject */
        function ngDatetime($document, $compile, $controller, $templateRequest) {
            return {
                restrict: 'A',
                replace: false,
                require: 'ngModel',
                scope: {},
                controller: 'NgDatetimeController as $ctrl',
                link: link
            };

            function link(scope, element, attrs, ngModel) {

                scope.select = select;
                angular.element(element).bind('click', show);

                function select(date) {
                    ngModel.$setViewValue(date);
                    ngModel.$render();
                }

                function show() {
                    $templateRequest('ng-datetime-view/ng-datetime-view.tpl.html')
                        .then(function(html) {
                            inject(html);
                        });
                }

                function inject(html) {
                    var localScope = scope.$new(true),
                        template = angular.element(html),
                        body = $document.find('body').eq(0),
                        locals = {
                            onSelect: select
                        };

                    body.append(template);
                    $compile(template)(localScope);
                    $controller('NgDatetimeViewController as $ctrl', locals ? angular.extend({$scope: localScope}, locals) : {$scope: localScope});
                }
            }
        }
})();