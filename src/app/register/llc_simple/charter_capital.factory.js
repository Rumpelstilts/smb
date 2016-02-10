/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('charter_capital', charter_capital)
  /* @ngInject */
  charter_capital.$inject = ['$rootScope']
  function charter_capital ($rootScope) {
    var service = {
      share_type: 0,
      amount: 10000,
      update: update
    }
    return service

    function update () {
      $rootScope.$broadcast('charter_capital:updated')
    }
  }
})()
