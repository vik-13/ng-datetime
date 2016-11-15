;(function() {
    angular
        .module('ng-datetime')
        .controller('NgDatetimeController', NgDatetimeController);

        /* ngInject */
        function NgDatetimeController(ngDatetimeService) {
            var ctrl = this;

            ctrl.today = moment().format('YYYY-MM-DD');
            ctrl.selected = ctrl.date ? moment(ctrl.date).format('YYYY-MM-DD') : ctrl.today;
            ctrl.view = moment(ctrl.selected).startOf('month');
            ctrl.data = ngDatetimeService.get(ctrl.view.format('YYYY-MM'));

            ctrl.getTitle = getTitle;
            ctrl.prev = prev;
            ctrl.next = next;
            ctrl.select = select;

            function getTitle() {
                return moment(ctrl.view).format('MMMM, YYYY');
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
                    ctrl.selected = moment(date).format('YYYY-MM-DD');
                }
            }

            function update() {
                angular.extend(ctrl.data, ngDatetimeService.get(ctrl.view.format('YYYY-MM')));
            }
        }
})();