/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbExecutive', smbExecutive)
  /* @ngInject */
  function smbExecutive () {
    // Usage:
    //
    // Creates:
    //
    var smbExecutive = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'A',
      scope: {
        executive: '=ngModel',
        founders: '=founders'
      },
      templateUrl: 'app/executive/executive.html'
    }
    return smbExecutive
    function link (scope, element, attrs) {
      // dynamic selectize needs to be declared here because it should trigger
      // $scope.$apply
      scope.vm.founder_config = {
        valueField: 'id',
        labelField: 'full_name',
        create: false,
        maxItems: 1,
        placeholder: 'Учредитель',
        onInitialize: function (selectize) {
          selectize.on('change', function () {
            scope.vm.validate_element('executive')
            var value = parseInt(selectize.getValue(), 10)
            if (value === '') return
            for (var i = 0; i < scope.vm.founders.length; i++) {
              if (scope.vm.founders[i].id === value) {
                scope.vm.executive = scope.vm.founders[i]
                scope.$apply()
                console.log(scope.vm.executive)
                return
              }
            }
          })
          // watch founders in order to update selectize
          scope.$on('update_founder:updated', function () {
            selectize.clear()
            selectize.clearOptions()
            selectize.addOption(scope.vm.founders)
            console.log('options updated!')
          })
        }
      }
      scope.vm.validate_element = function (name) {
        element.find('form:first-child').data('validator').element('input[name = "' + name + '"]')
      }
    }
  }
  Controller.$inject = ['individual', 'passport', 'contact_data', '$scope']
  /* @ngInject */
  function Controller (individual, passport, contact_data, $scope) {
    var vm = this
    vm.election_config = {} // selectize config
    vm.executive_details = {
      election_periods: [],
      positions: []
    }
    vm.founder_config = {} // selectize config
    vm.multiple_founders = 0 // when there are several founders
    vm.single_founder = 0 // when there's single founder
    activate()

    function activate () {
      vm.executive = {
        address_coords: [],
        contact_data: contact_data(),
        election_period: 4,
        position_title: '',
        passport: passport.ru(),
        personal_data: individual(),
        position: ''
      }
      vm.executive_details.positions = [
        {
          id: 0,
          title: 'Генеральный директор'
        },
        {
          id: 1,
          title: 'Директор'
        },
        {
          id: 2,
          title: 'Президент'
        },
        {
          id: 3,
          title: 'Другая'
        }
      ]
      vm.executive_details.election_periods = [
        {
          id: 0,
          title: '1 год'
        },
        {
          id: 1,
          title: '2 года'
        },
        {
          id: 2,
          title: '3 года'
        },
        {
          id: 3,
          title: '4 года'
        },
        {
          id: 4,
          title: '5 лет'
        }
      ]

      vm.position_config = {
        create: false,
        valueField: 'id',
        labelField: 'title',
        maxItems: 1,
        placeholder: 'Наименование должности',
        onInitialize: function (selectize) {
          selectize.on('change', function () {
            vm.validate_element('position')
          })
        }
      }
      vm.election_config = {
        create: false,
        valueField: 'id',
        labelField: 'title',
        maxItems: 1,
        placeholder: 'Срок избрания',
        onInitialize: function (selectize) {
          selectize.on('change', function () {
            vm.validate_element('election_period')
          })
        }
      }
    }
  }
})()
