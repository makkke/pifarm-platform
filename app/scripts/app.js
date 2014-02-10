'use strict';

var pifarmApp = angular.module('pifarmApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pifarm.config',
  'pifarm.constants',
  'ui.router',
  'restangular',
  'angularSpinner',
  'ngClipboard',
  'ui.bootstrap'
])

  .config(['Config', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'RestangularProvider', 'ngClipProvider',
    function (Config, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider, ngClipProvider) {

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
    
      $urlRouterProvider.otherwise( '/pinaples' );
      
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

        // pinaples
        .state('main.pinaples', {
          url: '/pinaples',
          templateUrl: 'views/pinaples.html',
          controller: 'PinaplesCtrl',
        })
        .state('main.new_pinaple', {
          url: '/pinaples/new',
          templateUrl: 'views/pinaple.new.html',
          controller: 'PinapleNewCtrl',
        })
        .state('main.pinaple', {
          abstract: true,
          url: '/pinaples/:pinaple_id',
          templateUrl: 'views/pinaple.html',
          controller: 'PinapleCtrl',
          resolve: {
            pinaple: function ($stateParams, $q, PinaplesRepoSvc) {
              var deferred = $q.defer();

              PinaplesRepoSvc.find( $stateParams.pinaple_id ).then(
                function (pinaple) {
                  deferred.resolve( pinaple );
                },
                function (error, status) {
                  console.log( 'error:', error );
                  deferred.reject( error );
                });

              return deferred.promise;
            }
          }
        })
        .state('main.pinaple.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/pinaple.dashboard.html',
          controller: 'PinapleDashboardCtrl',
        })

        .state('main.pinaple.data', {
          url: '/data',
          templateUrl: 'views/pinaple.data.html',
          controller: 'PinapleDataCtrl',
        })

        // slices
        .state('main.pinaple.slices', {
          url: '/slices',
          templateUrl: 'views/pinaple.slices.html',
          controller: 'SlicesCtrl',
        })
        .state('main.new_slice', {
          url: '/pinaples/:pinaple_id/slices/new',
          templateUrl: 'views/slice.new.html',
          controller: 'SliceNewCtrl',
        })

        .state('main.pinaple.settings', {
          url: '/settings',
          templateUrl: 'views/pinaple.settings.html',
          controller: 'PinapleSettingsCtrl',
        })

        // devices
        .state('main.devices', {
          url: '/devices',
          templateUrl: 'views/devices.html',
          controller: 'DevicesCtrl'
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

      // enable CORS
      $httpProvider.defaults.useXDomain = true;

      // setup Restangular
      var url = Config.api.protocol + '://' + Config.api.hostname + '/' + Config.api.version;
      RestangularProvider.setBaseUrl( url );
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

      // setup ngClip
      ngClipProvider.setPath( 'bower_components/zeroclipboard/ZeroClipboard.swf');

  }]);
