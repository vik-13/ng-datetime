;(function() {
    angular
        .module('ng-datetime')
        .controller('NgDatetimeController', NgDatetimeController);

        /* ngInject */
        function NgDatetimeController($scope, $element, $document, $compile, $controller, $templateRequest) {
            $scope.date = '';
            $scope.boundingRect = $element[0].getBoundingClientRect();
            $scope.instance = false;

            $scope.select = select;
            $scope.changeModel = changeModel;
            angular.element($element).on('click', open);

            function select(date) {
                $scope.date = moment(date).format($scope.format);
                $scope.ngModel.$setViewValue($scope.date);
                $scope.ngModel.$render();
                remove();
            }

            function changeModel(date) {
                $scope.date = date;
            }

            function open() {
                $templateRequest('ng-datetime-view/ng-datetime-view.tpl.html')
                    .then(function(html) {
                        inject(html);
                        angular.element($document).on('click', close);
                    });
            }

            function close(event) {
                if ( $scope.instance && !$scope.instance[0].contains(event.target)) {
                    remove();
                }
            }

            function remove() {
                angular.element($document).off('click', close);
                $scope.instance.remove();
                $scope.instance = false;
            }

            function inject(html) {
                var localScope = $scope,
                    template = angular.element(html),
                    body = $document.find('body').eq(0),
                    locals = {
                        onSelect: select
                    };

                template.css({
                    left: $scope.boundingRect.left + 'px',
                    top: ($scope.boundingRect.top + $scope.boundingRect.height) + 'px'
                });

                $scope.instance = template;

                body.append(template);
                $compile(template)(localScope);
                $controller('NgDatetimeViewController as $ctrl', locals ? angular.extend({$scope: localScope}, locals) : {$scope: localScope});
            }
        }
})();