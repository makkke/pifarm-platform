'use strict';

var pinapleApp = angular.module('pinapleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pinaple.config',
  'pinaple.constants',
  'ui.router',
  'restangular',
  'angularSpinner'
])

  .config(['Config', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'RestangularProvider',
    function (Config, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider) {

      // checks if the user is authenticated
      var logged_in = function($q, $location, AuthSvc) {
        var deferred = $q.defer();

        if( AuthSvc.logged_out() ) {
          $location.url( 'login' );
          deferred.resolve();
        }
        else {
          AuthSvc.set_session_token();
          if( !AuthSvc.account ) {
            AuthSvc.update_user_account().then(
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
          resolve: { logged_in: logged_in }
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
          controller: 'MainCtrl',
          resolve: { logged_in: logged_in }
        })

        // farm
        .state('main.farm', {
          url: '/farm',
          templateUrl: 'views/farm.html',
          controller: 'FarmCtrl',
        })

        // devices
        .state('main.devices', {
          url: '/devices',
          templateUrl: 'views/devices.html',
          controller: 'DevicesCtrl',
          // resolve: {
          //   devices: function ($q) {
          //     var deferred = $q.defer();

          //     DevicesRepoSvc.query().then(
          //       function (devices) {
          //         $scope.devices = devices;
          //         console.log( devices );
          //       },
          //       function (error, status) {
          //         console.log( 'error:', error );
          //       });
              
          //     return deferred.promise;
          //   }
          // }
        })
        .state('main.new_device', {
          url: '/devices/new',
          templateUrl: 'views/device.new.html',
          controller: 'DeviceNewCtrl',
        })
        .state('main.device', {
          abstract: true,
          url: '/devices/:device_id',
          templateUrl: 'views/device.html',
          controller: 'DeviceCtrl'
        })
        .state('main.device.general', {
          url: '/general',
          templateUrl: 'views/device.general.html',
          controller: 'DeviceGeneralCtrl',
        })
        .state('main.device.delete', {
          url: '/delete',
          templateUrl: 'views/device.delete.html',
          controller: 'DeviceDeleteCtrl',
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
        })
        .state('main.settings.account', {
          url: '/account',
          templateUrl: 'views/settings.account.html',
          controller: 'SettingsAccountCtrl',
        })
        .state('main.settings.keys', {
          url: '/keys',
          templateUrl: 'views/settings.keys.html',
          controller: 'SettingsKeysCtrl',
        })
        .state('main.settings.notifications', {
          url: '/notifications',
          templateUrl: 'views/settings.notifications.html',
          controller: 'SettingsNotificationsCtrl',
        })
        .state('main.settings.delete_account', {
          url: '/delete',
          templateUrl: 'views/settings.delete.html',
          controller: 'SettingsDeleteAccountCtrl',
        });

      //$locationProvider.html5Mode( true );

      // enable CORS
      $httpProvider.defaults.useXDomain = true;

      // setup Restangular
      var url = Config.api.protocol + '://' + Config.api.hostname + '/' + Config.api.version;
      RestangularProvider.setBaseUrl( url );
      RestangularProvider.setRestangularFields({
        id: '_id'
      });
      RestangularProvider.setResponseExtractor(function (response, operation) {
        if( response.status === 401 ) {
          $location.url( 'login' );
        }

        var modified_response;
        if( operation === 'getList' ) {
          if( response.data ) {
            modified_response = response.data;
            modified_response.metadata = response.metadata;
          }
          else {
            console.log('response:', response);
            return response;
          }
        }
        else {
          modified_response = response;
        }

        return modified_response;
      });  

  }]);
