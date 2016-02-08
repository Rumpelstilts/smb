/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbPermission', smbPermission)
  /* @ngInject */
  function smbPermission () {
    // Usage:
    // <div smb-permission = 'some_person'></div>
    // Creates:
    //
    var smbPermission = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'fpc',
      templateUrl: 'app/individual/permission.html',
      link: link,
      restrict: 'A',
      scope: {
        permission: '=model'
      }
    }
    return smbPermission
    function link (scope, element, attrs) {
      var rules = {
        permitDocumentType: {
          required: true
        },
        permitDocumentNumber: {
          required: true
        },
        permitDocumentDt: {
          required: true,
          date: true,
          passportDate: true
        },
        permitDocumentExpiry: {
          required: true,
          date: true,
          permitDocumentExpiry: true
        },
        permitDocumentAgency: {
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
