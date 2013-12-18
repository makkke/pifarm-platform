'use strict';

var pinapleApp = angular.module('pinapleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
    
    urlRouterProvider.otherwise( '/dashboard' );
    
    // setup states
    $stateProvider
      // user management
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl',
        resolve: { loggedin: isLoggedIn }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .state('forgot', {
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

  }]);
