/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('user_login_controller', user_login_controller)
  user_login_controller.$inject = ['$cookieStore', 'user_factory', 'login_service']
  /* @ngInject */
  function user_login_controller ($cookieStore, user_factory, login_service) {
    var vm = this
    vm.login = login
    vm.login_data = {
      email: '',
      password: ''
    }

    activate()
    // //////////////
    function activate () {
      console.log('User status: ' + user_factory.val)
    }

    function login () {
      login_service.resource.save(vm.login_data, function () {
        user_factory.update('authorized')
        console.log('User status: ' + user_factory.val)
        $cookieStore.put('user_status', 'authorized')
      }, function () {
        console.log('oh snap!')
      })
    }
  }
})()
