/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('valid_founder', valid_founder)
  valid_founder.$inject = ['charter_capital']
  /* @ngInject */
  function valid_founder (charter_capital) {
    var service = {
      shares: [],
      update: update,
      validate: validate
    }
    return service
    // //////////////

    function update (share, idx) {
      idx--
      service.shares[idx] = share
    }

    function validate () {
      var i
      switch (charter_capital.share_type) {
        case 0:
          var sum = 0
          for (i = 0; i < service.shares.length; i++) {
            sum += service.shares[i]
          }
          return (sum === 100)
        case 1:
          sum = 0
          for (i = 0; i < service.shares.length; i++) {
            sum += service.shares[i]
          }
          return (sum === 1)
        case 2:
          var common_denumenator = 0
          for (i = 0; i < service.shares.length; i++) {
            common_denumenator += service.shares[i].denum
          }
          var numerator_sum = 0
          for (i = 0; i < service.shares.length; i++) {
            numerator_sum += service.shares[i].num
          }
          return (numerator_sum / common_denumenator === 1)
      }
    }
  }
})()
