/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbCitizenship', smbCitizenship)
  smbCitizenship.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbCitizenship ($compile, $injector) {
    // Usage:
    // <div smb-citizenship model = 'some_person'></div>
    //
    // Creates:
    // manages citizenship of person (individual)
    //
    var smbCitizenship = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'cc',
      templateUrl: 'app/individual/citizenship.html',
      restrict: 'A',
      scope: {
        person: '=model'
      }
    }
    return smbCitizenship
  }
  /* @ngInject */
  Controller.$inject = ['$http']
  function Controller ($http) {
    var vm = this
    vm.citizenships = [
      {'id': 'ru', 'title': 'Российская федерация'},
      {'id': 'foreigner', 'title': 'Иностранный гражданин'}
    ]
    vm.countries = ''
    vm.get_countries = get_countries

    vm.citizenship_config = {
      create: false,
      valueField: 'id',
      labelField: 'title',
      maxItems: 1,
      placeholder: 'Гражданство'
    }

    vm.countries_config = {
      create: false,
      valueField: 'id',
      labelField: 'name',
      maxItems: 1,
      placeholder: 'Государство'
    }
    activate()

    function activate () {
      vm.get_countries()
    }

    function get_countries () {
      $http.get('json/countries.json').success(function (data) {
        vm.countries = data
      })
    }
  }
})()
