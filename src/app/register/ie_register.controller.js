/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('ie_register_controller', ie_register_controller)
  ie_register_controller.$inject = ['individual', 'passport']
  /* @ngInject */
  function ie_register_controller (individual, passport) {
    var vm = this
    vm.individual = ''
    vm.individual_passport = ''
    activate()
    // //////////////
    function activate () {
      vm.individual = individual()
      vm.individual_passport = passport()
    }
  }
})()
