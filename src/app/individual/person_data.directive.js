/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbPersonData', smbPersonData)
  smbPersonData.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbPersonData ($compile, $injector) {
    // Usage:
    // <div smb-person-data model = 'some_person'></div>
    //
    // Creates:
    // manages citizenship of person (individual)
    //
    var smbPersonData = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'pd',
      templateUrl: 'app/individual/person_data.html',
      link: link,
      restrict: 'A',
      scope: {
        person: '=model'
      }
    }
    return smbPersonData
    function link (scope, element, attrs) {
      var rules = {
        lastname: {
          required: true,
          cyrillicName: true
        },
        name: {
          required: true,
          cyrillicName: true
        },
        middlename: {
          required: true,
          cyrillicName: true
        },
        birthPlace: {
          required: true
        },
        birthDate: {
          required: true,
          date: true,
          birthDate: true
        },
        sex: {
          required: true
        },
        lastnameForeigner: {
          required: true,
          latinName: true
        },
        nameForeigner: {
          required: true,
          latinName: true
        },
        middlenameForeigner: {
          latinName: true
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
  function Controller () {
  }
})()
