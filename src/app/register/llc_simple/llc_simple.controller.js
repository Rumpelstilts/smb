/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('llc_simple_controller', llc_simple_controller)
  llc_simple_controller.$inject = ['individual', 'passport', 'contact_data']
  /* @ngInject */
  function llc_simple_controller (individual, passport, contact_data) {
    var vm = this
    vm.add_founder = add_founder
    vm.add_founder_collapsed = true
    vm.charter_capital = {}
    vm.new_founder
    vm.founders = []
    vm.title = ''
    activate()
    // //////////////
    function activate () {
      refresh_new_founder()
    }

    function add_founder () {
      vm.founders.push(vm.new_founder)
      refresh_new_founder()
      vm.add_founder_collapsed = !vm.add_founder_collapsed
    }

    function refresh_new_founder () {
      vm.new_founder = {
        contact_data: contact_data(),
        personal_data: individual(),
        passport: passport.ru()
      }
      reset_forms()
    // $('.new_founder').find('form').each(function () {
    //   $(this).$setPristine()
    // })
    }

    function reset_forms () {
      var forms = $('.new_founder')
      forms.find('label.has-error').remove()
      forms.find('.has-error').removeClass('has-error')
      forms.find('.has-success').removeClass('has-success')
    }
  }
})()
