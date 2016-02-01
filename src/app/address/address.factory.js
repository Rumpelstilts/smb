/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('address', address)
  /* @ngInject */
  function address () {
    function service () {
      return new Address()
    }
    return service
    // //////////////
    function Address () {
      this.region = ''
      this.city = ''
      this.street = ''
      this.building = ''
      this.buildingType = ''
      this.housing = ''
      this.housingType = ''
      this.flat = ''
      this.flatType = ''
      this.zip = ''
      this.fnsName = ''
    }
  }
})()
