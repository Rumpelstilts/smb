/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('login_service', login_service)
  login_service.$inject = ['$resource']
  /* @ngInject */
  function login_service ($resource) {
    var service = {
      resource: resource
    }
    return service
    // //////////////
    function resource () {
      return $resource('http://jsonplaceholder.typicode.com/users')
    }
  }
})()
