/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbPassport', smbPassport)
  smbPassport.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbPassport ($compile, $injector) {
    // Usage:
    // <div smb-passport model = 'some_person'></div>
    // Creates:
    // persons passport view
    var smbPassport = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'pc',
      templateUrl: 'app/individual/passport.html',
      link: link,
      restrict: 'A',
      scope: {
        passport: '=model'
      }
    }
    return smbPassport
    function link (scope, element, attrs) {
      var rules = {
        passportCode: {
          required: true,
          passportCode: true
        },
        passportNum: {
          required: true,
          passportNum: true
        },
        passportDt: {
          required: true,
          date: true,
          passportDate: true
        },
        passportAgency: {
          required: true
        },
        passportAgencyCode: {
          required: true,
          passportAgencyCode: true
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
    //  TODO: load existing data
  }
})()
