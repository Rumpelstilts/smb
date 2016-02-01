/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbForeignPassport', smbForeignPassport)
  smbForeignPassport.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbForeignPassport ($compile, $injector) {
    // Usage:
    // <div smb-foreign-passport = 'some_person'></div>
    // Creates:
    //
    var smbForeignPassport = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'fpc',
      templateUrl: 'app/individual/foreign_passport.html',
      link: link,
      restrict: 'A',
      scope: {
        passport: '=model'
      }
    }
    return smbForeignPassport
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
  }
})()
