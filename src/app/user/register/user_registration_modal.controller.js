/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('user_registration_modal_instance_ctrl', user_registration_modal_instance_ctrl)
  user_registration_modal_instance_ctrl.$inject = ['$uibModalInstance', '$scope']
  /* @ngInject */
  function user_registration_modal_instance_ctrl ($uibModalInstance, $scope) {
    var vm = this
    vm.cancel = cancel
    activate()
    // //////////////

    $scope.$on('user_status:updated', function (event, data) {
      // when user status changes anywhere else, it updates here as well
      // $scope injected only for this purpose, avoid using it in other cases
      cancel()
    })

    function activate () {
      console.log('modal called')
    }
    function cancel () {
      $uibModalInstance.dismiss('cancel')
    }
  }
})()
