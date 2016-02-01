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
    vm.permission
    activate()
    // //////////////
    function activate () {
      vm.individual = individual()
      vm.individual_passport = passport.ru()
      vm.individual_foreign_passport = passport.foreign()
      vm.permission = permission()
      vm.contact_data = contact_data()
    }
  }
})()
