;(function() {
    angular
        .module('app')
        .controller('AppController', AppController);

        /* ngInject */
        function AppController() {
            var ctrl = this;
            ctrl.data = {
                //date: '2016-11-15'
                date: '2016/11/15 11:12:00'
            };
        }
})();