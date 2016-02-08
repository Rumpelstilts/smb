/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbInn', smbInn)
  /* @ngInject */
  function smbInn () {
    // Usage:
    // <div smb-inn model = 'some_person' type = 'some_type'></div>
    // types: 'individual', 'legal_entity'
    // Creates:
    //
    var smbInn = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'ic',
      templateUrl: 'app/inn/inn.html',
      link: link,
      restrict: 'A',
      scope: {
        type: '=type',
        subject: '=model'
      }
    }
    return smbInn
    function link (scope, element, attrs) {
      var rules = {
        inn: {
          inn: true
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
  Controller.$inject = ['inn']
  function Controller (inn) {
    var vm = this
    vm.fetch_inn = fetch_inn
    vm.inn

    activate()

    function activate () {
      vm.inn = (vm.subject.inn) ? inn(vm.subject.inn) : inn('')
      vm.subject.inn = vm.inn.number
    }

    function fetch_inn () {
      switch (vm.type) {
        case 'individual':
          vm.inn.fetch_individual(vm.subject.individual)
          break
        case 'legal_entity':
          vm.inn.fetch_individual('')
          break
        default:
          return
      }
    }
  }
})()
