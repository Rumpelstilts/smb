/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('delete_okved_ctrl', delete_okved_ctrl)
  delete_okved_ctrl.$inject = ['$uibModalInstance', 'okved_data']
  /* @ngInject */
  function delete_okved_ctrl ($uibModalInstance, okved_data) {
    var vm = this
    vm.cancel = cancel
    vm.delete_okved = delete_okved
    vm.delete_idx // index of deleting element
    vm.chosen_okveds
    activate()
    // //////////////

    function activate () {
      vm.chosen_okveds = okved_data.okveds
      vm.delete_idx = okved_data.idx
    }
    function cancel () {
      $uibModalInstance.dismiss('cancel')
    }
    function delete_okved () {
      vm.chosen_okveds[vm.delete_idx].checked = false
      vm.chosen_okveds[vm.delete_idx].collapsed = true
      vm.chosen_okveds.splice(vm.delete_idx, 1)
      vm.cancel()
    }
  }
})()
