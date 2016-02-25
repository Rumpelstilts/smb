/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('llc_simple_controller', llc_simple_controller)
  llc_simple_controller.$inject = ['individual', 'passport', 'contact_data', 'delete_founder_factory', '$scope', '$uibModal']
  /* @ngInject */
  function llc_simple_controller (individual, passport, contact_data, delete_founder_factory, $scope, $uibModal) {
    var vm = this
    vm.add_founder = add_founder
    vm.add_founder_collapsed = true
    vm.charter_capital = {}
    vm.collapse_new_founder = collapse_new_founder
    vm.election_config = {} // selectize config
    vm.executive
    vm.executive_details = {
      election_periods: [],
      positions: []
    }
    vm.founder_config = {} // selectize config
    vm.founders = []
    vm.new_founder
    vm.multiple_founders = 0 // when there are several founders
    vm.position_config = {} // selectize config
    vm.single_founder = 0 // when there's single founder
    vm.title = ''

    activate()
    $scope.$on('delete_founder:updated', function () {
      call_delete_founder_modal(delete_founder_factory.idx, delete_founder_factory.name)
    })
    // //////////////
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
      vm.founder_config = {
        valueField: 'id',
        labelField: 'full_name',
        create: false,
        maxItems: 1,
        placeholder: 'Учредитель',
        onInitialize: function (selectize) {
          selectize.on('change', function () {
            var value = parseInt(selectize.getValue(), 10)
            for (var i = 0; i < vm.founders.length; i++) {
              if (vm.founders[i].id === value) {
                vm.executive = vm.founders[i]
                console.log(vm.executive)
                return
              }
            }
          })
          // watch founders in order to update selectize
          $scope.$on('update_founder:updated', function () {
            selectize.clear()
            selectize.clearOptions()
            selectize.addOption(vm.founders)
            selectize.refreshOptions()
            console.log('options updated!')
          })
        // $scope.$watch('llc.founders', function (curr, prev) {
        //   // selectize.clear()
        //   // selectize.clearOptions()
        //   // selectize.addOption(curr)
        //   // selectize.refreshOptions()
        //   // console.log(selectize.options)
        // })
        }
      }
    }

    function add_founder () {
      vm.founders.push(vm.new_founder)
      vm.add_founder_collapsed = !vm.add_founder_collapsed
      refresh_new_founder()
    }

    function call_delete_founder_modal (idx, name) {
      var founder_data = {
        idx: idx,
        name: name,
        founders: vm.founders
      }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/founder/delete_founder_modal.html',
        controller: 'delete_founder_ctrl',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          founder_data: function () {
            return founder_data
          }
        }
      })
    }

    function collapse_new_founder () {
      if (vm.add_founder_collapsed) {
        refresh_new_founder()
      }
      vm.add_founder_collapsed = !vm.add_founder_collapsed
    }

    function refresh_new_founder () {
      vm.new_founder = {
        contact_data: contact_data(),
        personal_data: individual(),
        passport: passport.ru()
      }
      reset_forms()
    }

    function reset_forms () {
      var forms = $('.new_founder')
      forms.find('label.has-error').remove()
      forms.find('.has-error').removeClass('has-error')
      forms.find('.has-success').removeClass('has-success')
    }
  }
})()
