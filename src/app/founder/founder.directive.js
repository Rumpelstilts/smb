/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbFounder', smbFounder)
  smbFounder.$inject = ['$templateCache', '$compile']
  /* @ngInject */
  function smbFounder ($templateCache, $compile) {
    // Usage:
    // <div smb-founder model = 'some_founder' idx = 'founder_index'></div>
    // Creates:
    //
    var smbFounder = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      templateUrl: 'app/founder/founder.html',
      restrict: 'A',
      scope: {
        founder: '=model',
        idx: '=idx'
      }
    }
    return smbFounder
    function link (scope, element, attrs) {
      var t
      var linkFn
      var content

      scope.vm.info_collapse_handler = function () {
        element.find('.founder_info').empty()
      }

      scope.vm.address_collapse_handler = function () {
        element.find('.founder_address').empty()
      }

      scope.vm.edit_founder_info = function () {
        if (!scope.vm.edit_info) {
          if ($('.founder_info:empty')) {
            scope.vm.edit_info = !scope.vm.edit_info
          }
        } else {
          t = $templateCache.get('founder_info.html')
          linkFn = $compile(t)
          content = linkFn(scope)
          element.find('.founder_info').append(content)
          scope.vm.edit_info = !scope.vm.edit_info
        }
      }

      scope.vm.edit_founder_address = function () {
        if (!scope.vm.edit_address) {
          if ($('.founder_address:empty')) {
            scope.vm.edit_address = !scope.vm.edit_address
          }
        } else {
          t = $templateCache.get('founder_address.html')
          linkFn = $compile(t)
          content = linkFn(scope)
          element.find('.founder_address').append(content)
          scope.vm.edit_address = !scope.vm.edit_address
        }
      }
    }
  }
  Controller.$inject = ['delete_founder_factory', 'charter_capital', '$scope']
  /* @ngInject */
  function Controller (delete_founder_factory, charter_capital, $scope) {
    var vm = this
    vm.address
    vm.address_valid
    vm.call_parent = call_parent
    vm.charter_share
    vm.denumerator = { // in case of fracional charter charter_capital
      val: '',
      valid: 'true'
    }
    vm.edit_address = true
    vm.edit_info = true
    // vm.edit_founder_address = edit_founder_address
    // vm.edit_founder_info = edit_founder_info
    vm.founder.address_coords = []
    vm.fraction
    vm.name
    vm.name_valid
    vm.numerator = '' // in case of fracional charter capital
    vm.save_founder_address_changes = save_founder_address_changes
    vm.save_founder_changes = save_founder_changes
    vm.share_type = charter_capital.share_type
    activate()

    function activate () {
      refresh_founder_personal_data()
      vm.address = 'Адрес не указан'
      console.log(charter_capital)
    }

    $scope.$on('charter_capital:updated', function () {
      vm.share_type = charter_capital.share_type
    })

    function call_parent () {
      delete_founder_factory.update(vm.idx, vm.name)
    }

    function count_share () {
      switch (charter_capital.share_type) {
        case 0:
          vm.charter_share = charter_capital.amount / 100 * vm.fraction
          break
        case '1':
          vm.charter_share = charter_capital.amount * vm.fraction
          break
        case '2':
          if (vm.denumerator === '' || vm.numerator === '') {
            vm.charter_share = 'Не определена'
          } else {
            vm.charter_share = charter_capital.amount * vm.numerator / vm.denumerator
          }
          break
      }
    }

    // function edit_founder_address () {
    //   vm.edit_address = !vm.edit_address
    // // setTimeout(function () {
    // //   $('.founder_info').find('form').each(function () {
    // //     $(this).valid()
    // //   })
    // // }, 500)
    // }

    // function edit_founder_info () {
    //   vm.edit_info = !vm.edit_info
    // // setTimeout(function () {
    // //   $('.founder_address').find('form').valid()
    // // }, 500)
    // }

    function refresh_founder_address () {
      var a = vm.founder.address
      vm.address = universal_trim(a.city) + ' ' + universal_trim(a.street) + ' ' + universal_trim(a.buildingType) + ' ' + universal_trim(a.building) + ' ' +
        universal_trim(a.housingType) + ' ' + universal_trim(a.housing) + ' ' + universal_trim(a.flatType) + ' ' + universal_trim(a.flat)
      if (vm.address.trim() === '') {
        vm.address = 'Адрес не указан'
      }
    }

    function refresh_founder_personal_data () {
      vm.name = vm.founder.personal_data.last_name + ' ' +
        vm.founder.personal_data.name + ' ' +
        vm.founder.personal_data.mid_name
      if (vm.name.trim() === '') {
        vm.name = 'Учредитель не указан'
      }
    }

    function save_founder_address_changes () {
      refresh_founder_address()
      vm.address_valid = validate_forms('founder_address')
      vm.edit_address = !vm.edit_address
    }
    function save_founder_changes () {
      refresh_founder_personal_data()
      vm.name_valid = validate_forms('founder_info')
      vm.edit_info = !vm.edit_info
    }

    function universal_trim (val) {
      return (val) ? val.trim() : ''
    }

    // returns amount of invalid forms; if res == 0, form is valid
    function validate_forms (container) {
      var invalid = 0
      $('.' + container).find('form').each(function () {
        if (!$(this).valid()) {
          invalid++
        }
      })
      return (invalid === 0)
    }
  }
})()
