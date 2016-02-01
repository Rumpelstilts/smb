/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbCustomAddress', smbCustomAddress)
  /* @ngInject */
  function smbCustomAddress () {
    // Usage:
    // <div smb-custom-address model = "some_address"><div>
    // Creates:
    //
    var smbCustomAddress = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'cac',
      link: link,
      templateUrl: 'app/address/custom_address.html',
      restrict: 'A',
      scope: {
        address: '=model'
      }
    }
    return smbCustomAddress
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
  }
})()
