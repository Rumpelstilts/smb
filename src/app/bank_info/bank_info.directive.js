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
    vm.cities = []
    vm.contact = ''
    vm.departments = []
    vm.department_cities
    vm.department_contact
    vm.selected = {}
    vm.subject.bank_info

    var department_selectize

    activate()

    function activate () {
      fetch_bank_info()
      vm.selected = {
        city: '',
        department: ''
      }
    }

    vm.city_config = {
      create: false,
      valueField: 'title',
      labelField: 'title',
      searchField: 'title',
      maxItems: 1,
      placeholder: 'Город обслуживания',
      onInitialize: function (selectize) {
        selectize.on('change', function () {
          vm.departments = vm.bank_info.departments[vm.selected.city]
          department_selectize.clear()
          department_selectize.clearOptions()
          department_selectize.addOption(vm.departments)
          vm.contact = ''
          console.log(vm.departments)
        })
      }
    }

    vm.department_config = {
      create: false,
      valueField: 'title',
      labelField: 'title',
      searchField: 'title',
      maxItems: 1,
      placeholder: 'Отделение обслуживания',
      onInitialize: function (selectize) {
        department_selectize = selectize
      },
      onChange: function (value) {
        for (var i = 0; i < vm.departments.length; i++) {
          if (vm.departments[i].title === value) {
            vm.contact = vm.departments[i].contacts
            console.log(vm.contact)
          }
        }
      }
    }

    function fetch_bank_info () {
      $http.get('json/bankAccount.json').success(function (data) {
        vm.bank_info = data
        var cities = Object.keys(vm.bank_info.departments)
        for (var i = 0; i < cities.length; i++) {
          vm.cities[i] = {
            id: i,
            title: cities[i]
          }
        }

        // vm.subject.bank_info.tariff = vm.bank_info.tariffDefault
        console.log(vm.bank_info)
        console.log(vm.cities)
      })
    }
  }
})()
