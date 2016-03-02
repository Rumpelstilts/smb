/* global angular */
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbLogin', smbLogin)
  smbLogin.$inject = ['user_factory']
  /* @ngInject */
  function smbLogin (user_factory) {
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
      scope.vm.login = function () {
        if (element.find('form').valid()) {
          user_factory.update('login')
          console.log('login: ' + scope.vm.login_data.email)
          console.log('password: ' + scope.vm.login_data.password)
        }
        else return false
      }
    }
  }

  /* @ngInject */
  function Controller () {
    var vm = this
    vm.login_data = {
      email: '',
      password: ''
    }
  }
})()
