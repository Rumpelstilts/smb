/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbCalendar', smbCalendar)
  /* @ngInject */
  smbCalendar.$inject = ['$compile', '$injector']
  function smbCalendar ($compile, $injector) {
    // Usage:
    // <input smb-calendar ng-model = 'ng-model'>
    // Creates:
    //
    var smbCalendar = {
      link: link,
      restrict: 'A',
      scope: {
        date: '=ngModel'
      }
    }
    return smbCalendar
    function link (scope, element, attrs) {
      element.datepicker(
        {
          format: 'dd.mm.yyyy',
          language: 'ru',
          autoclose: true
        })
      element.on('changeDate', function () {
        scope.date = element.val()
      })
    }
  }
})()
