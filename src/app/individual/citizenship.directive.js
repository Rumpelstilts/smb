/*global angular $*/
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
      link: link,
      templateUrl: 'app/individual/citizenship.html',
      restrict: 'A',
      scope: {
        person: '=model'
      }
    }
    return smbCitizenship
    function link (scope, element, attrs) {
      var rules = {
        citizenshipCode: {
          required: true
        },
        country: {
          required: true
        }
      }
      element.validate({
        rules: rules,
        errorClass: 'has-error',
        validClass: 'has-success',
        errorPlacement: function (error, errorElement) {
          $(errorElement).closest('.form-group').append(error)
        },
        highlight: function (element, errorClass, validClass) {
          $(element).closest('.form-group').addClass(errorClass).removeClass(validClass)
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).closest('.form-group').removeClass(errorClass).addClass(validClass)
        }
      })
    }
  }
  /* @ngInject */
  Controller.$inject = ['$http']
  function Controller ($http) {
    var vm = this
    vm.citizenships = [
      {'id': 'ru', 'name': 'Российская федерация'},
      {'id': 'foreigner', 'name': 'Иностранный гражданин'}
    ]
    vm.countries = ''
    vm.get_countries = get_countries

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
