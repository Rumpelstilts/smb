/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('user_registration_controller', user_registration_controller)

  user_registration_controller.$inject = ['$uibModal']
  /* @ngInject */
  function user_registration_controller ($uibModal) {
    var vm = this
    vm.open_login_modal = open_login_modal
    activate()
    // //////////////
    function activate () {
    }

    function open_login_modal () {
      $uibModal.open({
        animation: true,
        templateUrl: 'app/user/register/registration_or_login.html',
        controller: 'user_registration_modal_instance_ctrl',
        controllerAs: 'modal'
      })
    }
  }
})()
