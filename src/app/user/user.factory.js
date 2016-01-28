/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('user_factory', user_factory)
  user_factory.$inject = ['$rootScope']
  /* @ngInject */
  function user_factory ($rootScope) {
    var service = {
      val: '',
      update: update
    }
    return service
    // //////////////
    function update (data) {
      $rootScope.$broadcast('user_status:updated', data)
    }
  }
})()
