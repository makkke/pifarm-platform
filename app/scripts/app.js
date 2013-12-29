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

  .config(['Config', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'RestangularProvider',
    function (Config, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider) {

      $httpProvider.defaults.useXDomain = true;
      // checks if the user is authenticated
      var loggedIn = function($q, $location, AuthSvc) {
        var deferred = $q.defer();

        if( !AuthSvc.loggedIn() ) {
          $location.url( 'login' );
          deferred.resolve();
        }
        else {
          AuthSvc.setSessionToken();
          if( !AuthSvc.account ) {
            AuthSvc.updateUserAccount().then(
              function (account) {
                deferred.resolve();
              },
              function (error, status) {
                //$location.url( 'login' );
                deferred.resolve();
              });
          }
          else {
            deferred.resolve();
          }
        }
        
        return deferred.promise;
      };
    
      $urlRouterProvider.otherwise( '/farm' );
      
      $stateProvider
        // user management
        .state('auth', {
          abstract: true,
          templateUrl: 'views/auth.html',
          controller: 'AuthCtrl'
        })
        .state('auth.login', {
          url: '/login?username',
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
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })

        // farm
        .state('main.farm', {
          url: '/farm',
          templateUrl: 'views/farm.html',
          controller: 'FarmCtrl',
          //resolve: { loggedIn: loggedIn }
        })

        // devices
        .state('main.devices', {
          url: '/devices',
          templateUrl: 'views/devices.html',
          controller: 'DevicesCtrl',
          //resolve: { loggedIn: loggedIn }
        })
        .state('main.device_details', {
          url: '/devices/:device_id',
          templateUrl: 'views/device.details.html',
          controller: 'DeviceDetailsCtrl',
          //resolve: { loggedIn: loggedIn }
        })

        // account settings
        .state('main.settings', {
          abstract: true,
          url: '/settings',
          templateUrl: 'views/settings.html',
          controller: 'SettingsCtrl'
        })
        .state('main.settings.profile', {
          url: '/profile',
          templateUrl: 'views/settings.profile.html',
          controller: 'SettingsProfileCtrl',
          //resolve: { loggedIn: loggedIn }
        })

      //$locationProvider.html5Mode( true );

      // setup Restangular
      var url = Config.api.protocol + '://' + Config.api.hostname + '/' + Config.api.version;
      RestangularProvider.setBaseUrl( url );
      RestangularProvider.setRestangularFields({
        id: '_id'
      });
      RestangularProvider.setResponseExtractor(function (res, operation) {
        if( res.status === 401 ) {
          $location.url( 'login' );
        }
        return res;
      });  

  }]);
