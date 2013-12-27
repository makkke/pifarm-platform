'use strict';

var pinapleApp = angular.module('pinapleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pinaple.config',
  'ui.router',
  'restangular',
  'angularSpinner'
])

  .config(['Config', '$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider',
    function (Config, $stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {

      // checks if the user is authenticated
      var loggedIn = function($q, $location, AuthSvc) {
        var deferred = $q.defer();

        if( !AuthSvc.loggedIn() ) {
          $location.url( 'login' );
          deferred.resolve();
        }
        else {
          if( !AuthSvc.account ) {
            AuthSvc.updateUserAccount().then(
              function (account) {
                deferred.resolve();
              },
              function (error, status) {
                $location.url( 'login' );
                deferred.resolve();
              });
          }
          else {
            deferred.resolve();
          }
        }
        
        return deferred.promise;
      };
    
      $urlRouterProvider.otherwise( '/dashboard' );
      
      $stateProvider
        // user management
        .state('auth', {
          abstract: true,
          templateUrl: 'views/auth.html',
          controller: 'AuthCtrl'
        })
        .state('auth.login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('auth.logout', {
          url: '/logout',
          controller: 'LogoutCtrl',
          resolve: { loggedIn: loggedIn }
        })
        .state('auth.signup', {
          url: '/signup',
          templateUrl: 'views/signup.html',
          controller: 'SignupCtrl'
        })
        .state('auth.forgot', {
          url: '/forgot',
          templateUrl: 'views/forgot.html',
          controller: 'ForgotCtrl'
        })

        .state('main', {
          abstract: true,
          templateUrl: 'views/main.html'
        })

        .state('main.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          resolve: { loggedIn: loggedIn }
        })

      $locationProvider.html5Mode( true );

      // setup Restangular
      var url = Config.api.protocol + '://' + Config.api.hostname + '/' + Config.api.version;
      RestangularProvider.setBaseUrl( url );
      // RestangularProvider.setRestangularFields({
      //   id: 'sid',
      //   selfLink: 'uri'
      // });
      RestangularProvider.setResponseExtractor(function (response, operation) {
        if( response.status === 401 ) $location.url( 'login' );
        return response;
      });  

  }]);
