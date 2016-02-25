/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbRegister', smbRegister)
  // smbRegister.$inject = ['dependencies']
  /* @ngInject */
  function smbRegister ( /*dependencies*/) {
    // Usage:
    //
    // Creates:
    //
    var smbRegister = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'A',
      scope: {
      },
      templateUrl: 'app/user/registration.html'
    }
    return smbRegister
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.agreement = {
      rules: true,
      personal_data: true
    }
    vm.register_data = {
      email: '',
      password: '',
      password_repeat: ''
    }
  }
})()
