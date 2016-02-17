/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('charter_capital', charter_capital)
  /* @ngInject */
  charter_capital.$inject = ['$rootScope']
  function charter_capital ($rootScope) {
    var service = {
      amount: 10000,
      calculate_shares: calculate_shares,
      create_share: create_share,
      shares: [],
      share_type: 0,
      shares_valid: '',
      undefine_shares: undefine_shares,
      update: update
    }
    return service

    function update () {
      $rootScope.$broadcast('charter_capital:updated')
    }

    function calculate_share (share) {
      switch (service.share_type) {
        case 0:
          //  percent
          share.percent = share.percent.replace(/,/g, '.')
          share.val = service.amount / 100 * parseFloat(share.percent)
          break
        case '1':
          //  decimal fraction
          share.decimal_fraction = share.decimal_fraction.replace(/,/g, '.')
          share.val = service.amount * parseFloat(share.decimal_fraction)
          break
        case '2':
          //  simple fraction
          share.val = service.amount * parseFloat(share.numerator) / parseFloat(share.denumerator)
          break
      }
      share.val = share.val.toFixed(2)
    }

    function calculate_shares () {
      service.shares.forEach(function (element, index, array) {
        calculate_share(element)
      })
    }

    function create_share (idx) {
      service.shares[idx] = {
        decimal_fraction: '',
        denumerator: '',
        numerator: '',
        percent: '',
        val: 'Не определена'
      }
    }

    function undefine_share (element, index, array) {
      element.val = 'Не определена'
    }

    function undefine_shares () {
      service.shares.forEach(undefine_share)
    }
  }
})()
