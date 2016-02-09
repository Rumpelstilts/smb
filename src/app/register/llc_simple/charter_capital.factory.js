/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('charter_capital', charter_capital)
  /* @ngInject */
  function charter_capital () {
    var service = {
      share_type: 0,
      amount: 10000
    }
    return service
  }
})()
