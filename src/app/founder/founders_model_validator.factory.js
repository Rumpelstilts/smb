/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('founders_model_validator', founders_model_validator)
  /* @ngInject */
  function founders_model_validator () {
    var founders = []

    var service = {
      validate: validate,
      founders: founders
    }
    return service
    // //////////////
    function validate () {
      return founders.every(validate_founder)
    }

    function validate_founder (element, index, array) {
      element.address = (!element.address) ? false : element.address
      element.data = (!element.data) ? false : element.data
      console.log('validating element #' + (index + 1) + ': ' + (element.address && element.data))
      return (element.address && element.data)
    }
  }
})()
