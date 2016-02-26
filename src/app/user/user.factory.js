/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('user_factory', user_factory)
  user_factory.$inject = ['$rootScope', '$localStorage']
  /* @ngInject */
  function user_factory ($rootScope, $localStorage) {
    var service = {
      update: update
    }
    return service
    // //////////////
    function update (action) {
      $localStorage.user_status = (action === 'login') ? 'authorized' : 'unknown'
      console.log('user_status:' + $localStorage.user_status)
      $rootScope.$broadcast('user_status:updated')
    }
  }
})()
