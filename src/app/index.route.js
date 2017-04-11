(function() {
  'use strict';

  angular
    .module('maraveca')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }


    $stateProvider
      .state('home', {
        templateUrl: 'app/templates/template.html',
        controller: 'TemplateController',
        controllerAs: 'template',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('home.client', {
        url: '/clients',
        templateUrl: 'app/clients/index.html',
        controller: 'ClientController',
        controllerAs: 'client'
      })
      .state('home.potential', {
        url: '/potentials',
        templateUrl: 'app/potentials/index.html',
        controller: 'PotentialsController',
        controllerAs: 'potential'
      })
      .state('home.services', {
        url: '/services',
        templateUrl: 'app/services/index.html',
        controller: 'ServiceController',
        controllerAs: 'service'
      })
      .state('home.plans', {
        url: '/plan',
        templateUrl: 'app/plan/index.html',
        controller: 'PlanController',
        controllerAs: 'plan'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
