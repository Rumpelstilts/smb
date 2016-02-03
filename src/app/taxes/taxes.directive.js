/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbTaxes', smbTaxes)
  /* @ngInject */
  function smbTaxes () {
    // Usage:
    //	<div smb-taxes model = 'some_subject'><div>
    // Creates:
    //
    var smbTaxes = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'tc',
      link: link,
      restrict: 'A',
      templateUrl: 'app/taxes/taxes.html',
      scope: {
        subject: '=model'
      }
    }
    return smbTaxes
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  Controller.$inject = ['$http']
  function Controller ($http) {
    var vm = this
    activate()

    function activate () {
      fetch_tax_data()
    }

    function fetch_tax_data () {
      $http.get('json/taxes.json').success(function (data) {
        vm.subject.tax_data = data
      // vm.tax_data.tax_mode = data['taxMode']
      // vm.tax_data.tax_type = data['taxType']
      // vm.tax_data.tax_payer = data['taxPayer']
      })
    }
  }
})()
