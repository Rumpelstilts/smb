/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('llc_simple_controller', llc_simple_controller)
  llc_simple_controller.$inject = ['individual', 'passport', 'contact_data', 'delete_founder_factory', '$scope', '$uibModal']
  /* @ngInject */
  function llc_simple_controller (individual, passport, contact_data, delete_founder_factory, $scope, $uibModal) {
    var vm = this
    vm.add_founder = add_founder
    vm.add_founder_collapsed = true
    vm.charter_capital = {}
    vm.collapse_new_founder = collapse_new_founder
    vm.executive
    vm.founders = []
    vm.new_founder
    vm.multiple_founders = 0 // when there are several founders
    vm.single_founder = 0 // when there's single founder
    vm.title = ''

    // activate()
    $scope.$on('delete_founder:updated', function () {
      call_delete_founder_modal(delete_founder_factory.idx, delete_founder_factory.name)
    })

    function add_founder () {
      vm.founders.push(vm.new_founder)
      vm.add_founder_collapsed = !vm.add_founder_collapsed
      refresh_new_founder()
    }

    function call_delete_founder_modal (idx, name) {
      var founder_data = {
        idx: idx,
        name: name,
        founders: vm.founders
      }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/founder/delete_founder_modal.html',
        controller: 'delete_founder_ctrl',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          founder_data: function () {
            return founder_data
          }
        }
      })
    }

    function collapse_new_founder () {
      if (vm.add_founder_collapsed) {
        refresh_new_founder()
      }
      vm.add_founder_collapsed = !vm.add_founder_collapsed
    }

    function refresh_new_founder () {
      vm.new_founder = {
        contact_data: contact_data(),
        personal_data: individual(),
        passport: passport.ru()
      }
      reset_forms()
    }

    function reset_forms () {
      var forms = $('.new_founder')
      forms.find('label.has-error').remove()
      forms.find('.has-error').removeClass('has-error')
      forms.find('.has-success').removeClass('has-success')
    }
  }
})()
