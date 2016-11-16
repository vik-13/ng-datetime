;(function() {
    angular
        .module('ng-datetime-view')
        .controller('NgDatetimeViewController', NgDatetimeViewController);

        /* ngInject */
        function NgDatetimeViewController($scope, onSelect, ngDatetimeViewService) {
            var ctrl = this;

            ctrl.type = $scope.showType || 'datetime';

            ctrl.today = moment();
            ctrl.selected = $scope.date ? moment($scope.date) : ctrl.today.clone();
            ctrl.view = moment(ctrl.selected).startOf('month');
            ctrl.calendar = ngDatetimeViewService.get(ctrl.view.format('YYYY-MM'));

            ctrl.hours = ctrl.selected.format('HH');
            ctrl.minutes = ctrl.selected.format('mm');

            ctrl.getTitle = getTitle;
            ctrl.showTime = showTime;
            ctrl.prev = prev;
            ctrl.next = next;
            ctrl.select = select;
            ctrl.updateTime = updateTime;

            function getTitle() {
                return moment(ctrl.view).format('MMMM, YYYY');
            }

            function showTime() {
                return ctrl.selected.format('HH:mm');
            }

            function prev(event) {
                event.preventDefault();

                ctrl.view.subtract(1, 'months');
                update();
            }

            function next(event) {
                event.preventDefault();

                ctrl.view.add(1, 'months');
                update();
            }

            function select(event) {
                var date;
                event.preventDefault();

                date = angular.element(event.target).attr('date');
                if (date && ctrl.view.format('YYYY-MM') == moment(date).format('YYYY-MM')) {
                    ctrl.selected = moment(date);
                }
                onSelect(ctrl.selected);
            }

            function updateTime() {
                ctrl.selected.hour(ctrl.hours);
                ctrl.selected.minute(ctrl.minutes);
            }

            function update() {
                angular.extend(ctrl.calendar, ngDatetimeViewService.get(ctrl.view.format('YYYY-MM')));
            }
        }
})();