'use strict';

angular.module('pifarmApp')
  .directive('loadingBtn', [function () {
    return {
      restrict: 'A',
      scope: {
        loading: '='
      },
      link: function (scope, element, attrs) {
        scope.$watch('loading', function (value) {
          if( scope.loading ) {
            element.html( attrs.loadingText );
            element.attr( 'disabled', 'disabled' );
          }
          else {
            element.html( attrs.text );
            element.removeAttr( 'disabled' );
          }
        })
      }
    };
  }])