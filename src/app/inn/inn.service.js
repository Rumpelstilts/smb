/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('inn', inn)
  // inn.$inject = ['dependencies'] 
  /* @ngInject */
  function inn () {
    function service (number) {
      return new Inn(number)
    }
    return service
    // //////////////
    function fetch_individual (individual) {
      console.log(individual)
    }
    function fetch_legal_entity (legal_entity) {
      console.log(legal_entity)
    }

    function Inn (number) {
      this.number = number
      this.fetch_individual = fetch_individual
      this.fetch_legal_entity = fetch_legal_entity
    }
  }
})()
