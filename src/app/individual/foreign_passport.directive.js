/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbForeignPassport', smbForeignPassport)
  smbForeignPassport.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbForeignPassport ($compile, $injector) {
    // Usage:
    // <div smb-foreign-passport = 'some_person'></div>
    // Creates:
    //
    var smbForeignPassport = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'fpc',
      templateUrl: 'app/individual/foreign_passport.html',
      link: link,
      restrict: 'A',
      scope: {
        passport: '=model'
      }
    }
    return smbForeignPassport
    function link (scope, element, attrs) {
      var rules = {
        passportNumForeigner: {
          required: true
        },
        passportDtForeigner: {
          required: true,
          date: true,
          passportDate: true
        },
        passportAgencyForeigner: {
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
  function Controller () {
  }
})()
