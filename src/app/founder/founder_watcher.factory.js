/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('founder_watcher', founder_watcher)
  founder_watcher.$inject = ['$rootScope']
  /* @ngInject */
  function founder_watcher ($rootScope) {
    var service = {
      update: update
    }
    return service
    // //////////////
    function update () {
      console.log('updating founders...')
      $rootScope.$broadcast('update_founder:updated')
    }
  }
})()
