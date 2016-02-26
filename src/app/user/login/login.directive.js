/* global angular */
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbLogin', smbLogin)
  /* @ngInject */
  function smbLogin () {
    // Usage:
    //
    // Creates:
    //
    var smbLogin = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'A',
      scope: {
      },
      templateUrl: 'app/user/login/login.html'
    }
    return smbLogin
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.login_data = {
      email: '',
      password: ''
    }
    vm.login = login

    function login () {
      console.log('login: ' + vm.login_data.email)
      console.log('password: ' + vm.login_data.password)
    }
  }
})()
