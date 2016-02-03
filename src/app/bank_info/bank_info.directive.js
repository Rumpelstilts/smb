/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbBankInfo', smbBankInfo)
  /* @ngInject */
  function smbBankInfo () {
    // Usage:
    // <div smb-bank-indo model = ''></div>
    // Creates:
    //
    var smbBankInfo = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'A',
      templateUrl: 'app/bank_info/bank_info.html',
      scope: {
        subject: '=model'
      }
    }
    return smbBankInfo
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  Controller.$inject = ['$http']
  function Controller ($http) {
    var vm = this
    vm.bank_description = ''
    vm.bank_info
    vm.city_departments
    vm.department_cities
    vm.department_contact
    vm.subject.bank_info
    vm.switch_city = switch_city
    vm.switch_department = switch_department

    activate()

    function activate () {
      fetch_bank_info()
      vm.subject.bank_info = {
        city: '',
        department: ''
      }
    }

    function fetch_bank_info () {
      $http.get('json/bankAccount.json').success(function (data) {
        vm.bank_info = data
        vm.department_cities = Object.keys(vm.bank_info.departments)
        vm.subject.bank_info.tariff = vm.bank_info.tariffDefault
        console.log(vm.bank_info)
      })
    }

    function switch_city () {
      console.log(vm.subject.bank_info.city)
      vm.city_departments = vm.bank_info.departments[vm.subject.bank_info.city]
    }

    function switch_department () {
      console.log(vm.subject.bank_info.department)
      vm.department_contact = vm.bank_info.departments[vm.subject.bank_info.city][vm.subject.bank_info.department].contacts
    }
  }
})()
