/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('ie_register_controller', ie_register_controller)
  ie_register_controller.$inject = ['individual', 'passport', 'permission', 'contact_data']
  /* @ngInject */
  function ie_register_controller (individual, passport, permission, contact_data) {
    var vm = this
    vm.address_coords = []
    vm.contact_data
    vm.doc_delivery = 3
    vm.individual
    vm.individual_passport
    vm.individual_foreign_passport
    vm.okveds
    vm.permission
    vm.tax_data = []
    activate()
    // //////////////
    function activate () {
      vm.contact_data = contact_data()
      vm.individual = individual()
      vm.individual_passport = passport.ru()
      vm.individual_foreign_passport = passport.foreign()
      vm.okveds = {
        groups: [],
        tree: [],
        chosen: []
      }
      vm.permission = permission()
    }
  }
})()
