/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('user_registration_modal_instance_ctrl', user_registration_modal_instance_ctrl)
  user_registration_modal_instance_ctrl.$inject = ['$uibModalInstance']
  /* @ngInject */
  function user_registration_modal_instance_ctrl ($uibModalInstance) {
    var vm = this
    vm.cancel = cancel
    activate()
    // //////////////
    function activate () {
      console.log('modal called')
    }
    function cancel () {
      $uibModalInstance.dismiss('cancel')
    }
  }
})()
