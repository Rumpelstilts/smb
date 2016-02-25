/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('menu_controller', menu_controller)

  menu_controller.$inject = ['user_factory', '$cookieStore', '$scope', '$state', '$uibModal']
  /* @ngInject */
  function menu_controller (user_factory, $cookieStore, $scope, $state, $uibModal) {
    var vm = this
    vm.get_status = get_status
    vm.open_login_modal = open_login_modal
    vm.status = ''
    activate()

    $scope.$on('user_status:updated', function (event, data) {
      // when user status changes anywhere else, it updates here as well
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

    function open_login_modal () {
      $uibModal.open({
        animation: true,
        templateUrl: 'app/user/login/registration_or_login.html',
        controller: 'user_registration_modal_instance_ctrl',
        controllerAs: 'modal'
      })
    }
  }
})()
