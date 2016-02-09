/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('delete_founder_factory', delete_founder_factory)
  delete_founder_factory.$inject = ['$rootScope']
  /* @ngInject */
  function delete_founder_factory ($rootScope) {
    var service = {
      idx: '',
      name: '',
      update: update
    }
    return service
    // //////////////
    function update (idx, name) {
      service.idx = idx - 1
      service.name = name
      $rootScope.$broadcast('delete_founder:updated')
    }
  }
})()
