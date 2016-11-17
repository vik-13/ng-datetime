;(function() {
    angular
        .module('ng-datetime-view')
        .controller('NgDatetimeViewController', NgDatetimeViewController);

        /* ngInject */
        function NgDatetimeViewController($scope, onSelect, ngDatetimeViewService) {
            var ctrl = this;

            ctrl.type = $scope.showType || 'datetime';
            ctrl.min = $scope.minDate ? moment($scope.minDate) : moment().subtract(10, 'years');
            ctrl.max = $scope.maxDate ? moment($scope.maxDate) : moment().add(10, 'years');


            ctrl.today = moment();
            ctrl.selected = $scope.date ? moment($scope.date, $scope.format) : ctrl.today.clone();
            ctrl.view = moment(ctrl.selected).startOf('month');
            ctrl.calendar = ngDatetimeViewService.get(ctrl.view.format('YYYY-MM'), ctrl.min, ctrl.max);

            ctrl.hours = ctrl.selected.format('HH');
            ctrl.minutes = ctrl.selected.format('mm');

            ctrl.getTitle = getTitle;
            ctrl.showTime = showTime;
            ctrl.prev = prev;
            ctrl.next = next;
            ctrl.select = select;
            ctrl.updateTime = updateTime;
            ctrl.isInactive = isInactive;

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
                var date, el;
                event.preventDefault();

                el = angular.element(event.target);

                date = el.attr('date');
                if (!el.hasClass('inactive') && date && ctrl.view.format('YYYY-MM') == moment(date).format('YYYY-MM')) {
                    ctrl.selected.year(moment(date).year());
                    ctrl.selected.month(moment(date).month());
                    ctrl.selected.date(moment(date).date());
                    onSelect(ctrl.selected, true);
                }
            }

            function updateTime() {
                ctrl.selected.hour(ctrl.hours);
                ctrl.selected.minute(ctrl.minutes);
                onSelect(ctrl.selected);
            }

            function isInactive(day) {
                return !day.status ||
                    day.date < ctrl.min ||
                    day.date > ctrl.max;
            }

            function update() {
                angular.extend(ctrl.calendar, ngDatetimeViewService.get(ctrl.view.format('YYYY-MM'), ctrl.min, ctrl.max));
            }
        }
})();