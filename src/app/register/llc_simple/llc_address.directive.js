/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbLlcAddress', smbLlcAddress)
  // smbLlcAddress.$inject = ['dependencies']
  /* @ngInject */
  function smbLlcAddress () {
    // Usage:
    //
    // Creates:
    //
    var smbLlcAddress = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      templateUrl: 'app/register/llc_simple/llc_address.html',
      restrict: 'A',
      scope: {
        executive: '=',
        address: '=' // llc.address
      }
    }
    return smbLlcAddress
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.modified = {
      address: {},
      coords: []
    }
    vm.manual_input = false
    vm.swap_addresses = swap_addresses

    activate()

    function activate () {
      vm.address = vm.modified.address
    }

    function swap_addresses () {
      if (vm.manual_input) {
        vm.address = vm.executive.address
      } else {
        vm.address = vm.modified.address
      }
    }
  }
})()
