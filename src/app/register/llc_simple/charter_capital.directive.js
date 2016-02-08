/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbCharterCap', smbCharterCap)
  /* @ngInject */
  function smbCharterCap () {
    // Usage:
    // <div smb-charter-cap='some_capital'></div>
    // Creates:
    //
    var smbCharterCap = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'A',
      templateUrl: 'app/register/llc_simple/charter_capital.html',
      scope: {
        charter_cap: '=model'
      }
    }
    return smbCharterCap
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.charter_cap.share_type = ''
    vm.charter_cap.amount = ''

    activate()

    function activate () {
      vm.charter_cap.share_type = 0
      vm.charter_cap.amount = 10000
    }
  }
})()
