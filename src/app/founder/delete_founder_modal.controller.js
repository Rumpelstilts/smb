/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('delete_founder_ctrl', delete_founder_ctrl)
  delete_founder_ctrl.$inject = ['$uibModalInstance', 'founder_data']
  /* @ngInject */
  function delete_founder_ctrl ($uibModalInstance, founder_data) {
    var vm = this
    vm.cancel = cancel
    vm.delete_founder = delete_founder
    vm.founder_name = founder_data.name

    function cancel () {
      $uibModalInstance.dismiss('cancel')
    }

    function delete_founder () {
      founder_data.founders.splice(vm.delete_idx, 1)
      vm.cancel()
    }
  }
})()
