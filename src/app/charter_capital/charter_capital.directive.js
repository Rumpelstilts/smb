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
      templateUrl: 'app/charter_capital/charter_capital.html',
      scope: {
        charter_cap: '=model'
      }
    }
    return smbCharterCap
    function link (scope, element, attrs) {
    }
  }
  Controller.$inject = ['charter_capital']
  /* @ngInject */
  function Controller (charter_capital) {
    var vm = this
    vm.charter_cap = charter_capital
  }
})()
