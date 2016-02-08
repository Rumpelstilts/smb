/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbContactData', smbContactData)
  smbContactData.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbContactData ($compile, $injector) {
    // Usage:
    // <div smb-contact-data model = 'some_person'></div>
    // Creates:
    //
    var smbContactData = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'cdc',
      templateUrl: 'app/individual/contact_data.html',
      link: link,
      restrict: 'A',
      scope: {
        contact: '=model'
      }
    }
    return smbContactData
    function link (scope, element, attrs) {
      var rules = {
        phone: {
          required: true,
          mobile: true
        },
        email: {
          required: true,
          email: true
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
