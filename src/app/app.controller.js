;(function() {
    angular
        .module('app')
        .controller('AppController', AppController);

        /* ngInject */
        function AppController() {
            var ctrl = this;
            ctrl.data = {
                date: '2016-11-11'
            };
        }
})();