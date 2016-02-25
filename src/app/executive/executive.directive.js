/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbExecutive', smbExecutive)
  // smbExecutive.$inject = ['dependencies']
  /* @ngInject */
  function smbExecutive ( /*dependencies*/) {
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
            var value = parseInt(selectize.getValue(), 10)
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
    activate()

    function activate () {
      vm.executive = {
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
        placeholder: 'Наименование должности'
      }
      vm.election_config = {
        create: false,
        valueField: 'id',
        labelField: 'title',
        maxItems: 1,
        placeholder: 'Срок избрания'
      }
    }
  }
})()
