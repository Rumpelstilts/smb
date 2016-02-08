/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('llc_ctart_controller', llc_ctart_controller)
  llc_ctart_controller.$inject = ['$state']
  /* @ngInject */
  function llc_ctart_controller ($state) {
    var vm = this
    vm.redirect = redirect
    vm.routes = [
      'register_llc_simple',
      'register_llc_complex'
    ]
    vm.selected_route = 0
    // //////////////
    function redirect () {
      $state.go(vm.routes[vm.selected_route])
    }
  }
})()
