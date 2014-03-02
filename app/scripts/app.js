'use strict';

angular.module('pifarmApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pifarm.config',
  'pifarm.constants',
  'ui.router',
  'restangular',
  'ngClipboard',
  'ui.bootstrap',
  'ui.select2'
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
        templateUrl: 'partials/auth',
        controller: 'AuthCtrl'
      })
      .state('auth.login', {
        url: '/login?username',
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .state('auth.logout', {
        url: '/logout',
        controller: 'LogoutCtrl',
        resolve: { logged_in: logged_in }
      })
      .state('auth.signup', {
        url: '/signup',
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .state('auth.forgot', {
        url: '/forgot',
        templateUrl: 'partials/forgot',
        controller: 'ForgotCtrl'
      })
      .state('auth.new_password', {
        url: '/new-password',
        templateUrl: 'partials/new-password',
        controller: 'NewPasswordCtrl'
      })

      .state('main', {
        abstract: true,
        templateUrl: 'partials/main',
        controller: 'MainCtrl',
        resolve: { logged_in: logged_in }
      })

      // pinaples
      .state('main.pinaples', {
        url: '/pinaples',
        templateUrl: 'partials/pinaples',
        controller: 'PinaplesCtrl',
      })
      .state('main.new_pinaple', {
        url: '/pinaples/new',
        templateUrl: 'partials/pinaple-new',
        controller: 'PinapleNewCtrl',
      })
      .state('main.pinaple', {
        abstract: true,
        url: '/pinaples/:pinaple_id',
        templateUrl: 'partials/pinaple',
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
        templateUrl: 'partials/pinaple-dashboard',
        controller: 'PinapleDashboardCtrl',
      })

      .state('main.pinaple.data', {
        url: '/data',
        templateUrl: 'partials/pinaple-data',
        controller: 'PinapleDataCtrl',
      })

      // pinaple devices
      .state('main.pinaple.devices', {
        url: '/devices',
        templateUrl: 'partials/pinaple-devices',
        controller: 'PinapleDevicesCtrl',
      })

      // pinaple slices
      .state('main.pinaple.slices', {
        url: '/slices',
        templateUrl: 'partials/pinaple-slices',
        controller: 'PinapleSlicesCtrl',
      })
      .state('main.new_slice', {
        url: '/pinaples/:pinaple_id/slices/new',
        templateUrl: 'partials/slice-new',
        controller: 'SliceNewCtrl',
      })

      .state('main.pinaple.settings', {
        url: '/settings',
        templateUrl: 'partials/pinaple-settings',
        controller: 'PinapleSettingsCtrl',
      })

      // devices
      .state('main.devices', {
        url: '/devices',
        templateUrl: 'partials/devices',
        controller: 'DevicesCtrl'
      })
      .state('main.new_device', {
        url: '/devices/new',
        templateUrl: 'partials/device-new',
        controller: 'DeviceNewCtrl',
      })
      .state('main.device', {
        abstract: true,
        url: '/devices/:device_id',
        templateUrl: 'partials/device',
        controller: 'DeviceCtrl',
        resolve: {
          device: function ($stateParams, $q, DevicesRepoSvc) {
            var deferred = $q.defer();

            DevicesRepoSvc.find( $stateParams.device_id ).then(
              function (device) {
                deferred.resolve( device );
              },
              function (error, status) {
                console.log( 'error:', error );
                deferred.reject( error );
              });

            return deferred.promise;
          }
        }
      })
      .state('main.device.general', {
        url: '/general',
        templateUrl: 'partials/device-general',
        controller: 'DeviceGeneralCtrl',
      })
      .state('main.device.delete', {
        url: '/delete',
        templateUrl: 'partials/device-delete',
        controller: 'DeviceDeleteCtrl',
      })
      .state('main.device.key', {
        url: '/key',
        templateUrl: 'partials/device-key',
        controller: 'DeviceKeyCtrl',
      })

      // account settings
      .state('main.settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        resolve: {
          account: function ($stateParams, $q, AccountsRepoSvc) {
            var deferred = $q.defer();

            AccountsRepoSvc.me().then(
              function (account) {
                deferred.resolve( account );
              },
              function (error, status) {
                console.log( 'error:', error );
                deferred.reject( error );
              });

            return deferred.promise;
          }
        }
      })
      .state('main.settings.profile', {
        url: '/profile',
        templateUrl: 'partials/settings-profile',
        controller: 'SettingsProfileCtrl',
      })
      .state('main.settings.account', {
        url: '/account',
        templateUrl: 'partials/settings-account',
        controller: 'SettingsAccountCtrl',
      })
      .state('main.settings.keys', {
        url: '/keys',
        templateUrl: 'partials/settings-keys',
        controller: 'SettingsKeysCtrl',
      })
      .state('main.settings.notifications', {
        url: '/notifications',
        templateUrl: 'partials/settings-notifications',
        controller: 'SettingsNotificationsCtrl',
      })
      .state('main.settings.delete_account', {
        url: '/delete',
        templateUrl: 'partials/settings-delete',
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
