'use strict';

var pinapleApp = angular.module('pinapleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pinaple.config',
  'ui.router',
  'restangular',
])

  .config(['Config', '$stateProvider', '$urlRouterProvider', 'RestangularProvider',
    function (Config, $stateProvider, $urlRouterProvider, RestangularProvider) {

      // checks if the user is authenticated
      var isLoggedIn = function($q, $http, $location){
        var deferred = $q.defer();

        // $http.get( '/loggedin' ).success(
        //   function (response) {
        //     if( response !== '0' ) {
        //       // if authenticated on server then
        //       // if( !AuthSvc.loggedIn ) {
        //       //   // if not authenticated in app then
        //       //   AuthSvc.login( response.sid, response.auth_token ).then(
        //       //     function (user) {
        //       //       deferred.resolve( user );
        //       //     },
        //       //     function (response) {
                    
        //       //     });
        //       // }
        //       // deferred.resolve( AuthSvc.user );
        //     }
        //     else {
        //       // not authenticated on server
        //       deferred.reject();
        //       $location.url( 'login' );
        //     }
        //   });
        deferred.resolve();
        $location.url( 'login' );

        return deferred.promise;
      };
    
      $urlRouterProvider.otherwise( '/dashboard' );
      
      $stateProvider
        .state('auth', {
          abstract: true,
          templateUrl: 'views/auth.html'
        })

        // user management
        .state('auth.login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('auth.logout', {
          url: '/logout',
          controller: 'LogoutCtrl',
          resolve: { loggedin: isLoggedIn }
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
          resolve: { loggedin: isLoggedIn }
        })

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
