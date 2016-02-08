/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbPassport', smbPassport)
  smbPassport.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbPassport ($compile, $injector) {
    // Usage:
    // <div smb-passport model = 'some_person'></div>
    // Creates:
    // persons passport view
    var smbPassport = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'pc',
      templateUrl: 'app/individual/passport.html',
      link: link,
      restrict: 'A',
      scope: {
        passport: '=model'
      }
    }
    return smbPassport
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
    //  TODO: load existing data
  }
})()
