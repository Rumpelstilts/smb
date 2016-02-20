/*global angular $*/
;(function () {
  'use strvmt'
  angular
    .module('smb')
    .directive('smbInn', smbInn)
  smbInn.$inject = ['toastr']
  /* @ngInject */
  function smbInn (toastr) {
    // Usage:
    // <div smb-inn model = 'some_person' type = 'some_type'></div>
    // types: 'individual', 'legal_entity'
    // Creates:
    //
    var smbInn = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      templateUrl: 'app/inn/inn.html',
      link: link,
      restrvmt: 'A',
      scope: {
        type: '=type',
        subject: '=model'
      }
    }
    return smbInn
    function link (scope, element, attrs) {
      scope.vm.validate_inn_fields = function () {
        var parent_container = $(element[0]).parent()[0]
        var name_valid = validate_fields(parent_container, 'personal_data', ['lastname', 'name', 'middlename', 'birthDate'])
        var passport_valid = validate_fields(parent_container, 'passport_ru', ['passportCode', 'passportNum', 'passportDt'])
        if (name_valid && passport_valid) {
          toastr.success('Все поля для ИНН заполнены.', 'Успех')
          var inn_props = {
            name: scope.vm.subject.individual.name,
            last_name: scope.vm.subject.individual.last_name,
            mid_name: scope.vm.subject.individual.mid_name,
            birth_date: scope.vm.subject.individual.birth_date,
            passport_series: scope.vm.subject.individual_passport.series,
            passport_number: scope.vm.subject.individual_passport.number,
            passport_date_of_issue: scope.vm.subject.individual_passport.date_of_issue
          }
          console.log(inn_props)
        } else {
          toastr.error('Заполните все обязательные поля для ИНН', 'Ошибка!')
        }
      }

      // returns true if all fields form array are valid
      function validate_fields (parent_container, form_entity, field_names) {
        var form = $(parent_container).find('form[entity = "' + form_entity + '"]')
        var valid_fields = 0 // amount of valid fields
        for (var i = 0; i < field_names.length; i++) {
          if ($(form).data('validator').element('input[name = "' + field_names[i] + '"]')) {
            valid_fields++
          }
        }
        return (valid_fields === field_names.length)
      }
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.fetch_inn = fetch_inn
    vm.inn

    activate()

    function activate () {
      vm.inn = vm.subject.inn
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
