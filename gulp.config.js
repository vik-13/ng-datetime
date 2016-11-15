module.exports = function() {
    return {
        sources: {
            index: 'src/index.html',
            scripts: 'src/ng-datetime/**/*.js',
            demoScripts: 'src/app/**/*.js',
            stylesheets: [
                'src/stylesheets/main.scss'
            ],
            templates: 'src/ng-datetime/**/*.tpl.html',
            vendors: [
                'node_modules/angular/angular.min.js',
                'node_modules/moment/min/moment.min.js'
            ],
        },
        dev: {
            index: 'demo',
            scripts: 'dist',
            demoScripts: 'demo',
            stylesheets: 'dist',
            templates: 'dist',
            vendors: 'demo/vendor'
        }
    };
};