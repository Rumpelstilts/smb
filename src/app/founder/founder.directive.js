/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbFounder', smbFounder)
  // smbFounder.$inject = ['dependencies']
  /* @ngInject */
  function smbFounder ( /*dependencies*/) {
    // Usage:
    // <div smb-founder model = 'some_founder'></div>
    // Creates:
    //
    var smbFounder = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      templateUrl: 'app/founder/founder.html',
      restrict: 'A',
      scope: {
        founder: '=model'
      }
    }
    return smbFounder
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.address
    vm.edit_info = true
    vm.edit_address = true
    vm.name
    activate()

    function activate () {
      vm.name = vm.founder.personal_data.last_name + ' ' +
        vm.founder.personal_data.name + ' ' +
        vm.founder.personal_data.mid_name
    }
  }
})()
