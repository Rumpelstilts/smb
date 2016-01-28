/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('menu_controller', menu_controller)

  menu_controller.$inject = ['user_factory', '$cookieStore', '$scope', '$state']
  /* @ngInject */
  function menu_controller (user_factory, $cookieStore, $scope, $state) {
    var vm = this
    vm.get_status = get_status
    vm.status = ''
    activate()

    $scope.$on('user_status:updated', function (event, data) {
      // when user status changes wherever else, it updates here as well
      // $scope injected only for this purpose, avoid using it in other cases
      vm.status = user_factory.val
    })

    // //////////////
    function activate () {
      vm.get_status()
      user_factory.update(vm.status)
      console.log('User status:' + vm.status)
    }

    function get_status () {
      // gets user status from cookiestore it's either 'authorized' or 'unknown'
      vm.status = $cookieStore.get('user_status') || 'unknown'
    }
  }
})()
