/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbPermission', smbPermission)
  /* @ngInject */
  function smbPermission () {
    // Usage:
    // <div smb-permission = 'some_person'></div>
    // Creates:
    //
    var smbPermission = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'fpc',
      templateUrl: 'app/individual/permission.html',
      link: link,
      restrict: 'A',
      scope: {
        permission: '=model'
      }
    }
    return smbPermission
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
  }
})()
