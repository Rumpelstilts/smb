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

      // returns amount of invalid forms; if res == 0, form is valid
      scope.vm.validate_form = function (container) {
        var invalid = 0
        $(element).find('.' + container).find('form').each(function () {
          if (!$(this).valid()) {
            invalid++
          }
        })
        return (invalid === 0)
      }

      scope.vm.info_collapse_handler = function () {
        element.find('.founder_info').empty()
      }

      scope.vm.address_collapse_handler = function () {
        element.find('.founder_address').empty()
      }

      scope.vm.validate_address = function () {
        if (element.children('form:not(:hidden)').length === 0) {
          // if custom input form is collpased, check model
          for (var prop in scope.vm.founder.address) {
            if (scope.vm.founder.address.hasOwnProperty(prop)) {
              // if prop is required
              if (prop !== 'housing' && prop !== 'housingType' && prop !== 'flat' && prop !== 'flatType') {
                // if null or ''
                if (!scope.vm.founder.address[prop] || scope.vm.founder.address[prop] === '') {
                  console.log('model is not valid!')
                  return false
                }
              }
            }
          }
          console.log('model is valid!')
          return true
        } else {
          return scope.vm.validate_form('founder_address')
        }
      }

      scope.vm.edit_founder_info = function () {
        if (!scope.vm.edit_info) {
          scope.vm.save_founder_changes()
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
          scope.vm.save_founder_address_changes()
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
    vm.edit_address = true
    vm.edit_info = true
    vm.founder.address_coords = []
    vm.founder.property_payment = false
    vm.name_valid
    vm.save_founder_address_changes = save_founder_address_changes
    vm.save_founder_changes = save_founder_changes
    vm.share
    vm.share_type = charter_capital.share_type
    activate()

    function activate () {
      vm.founder.id = vm.idx + 1
      charter_capital.create_share(vm.idx)
      vm.share = charter_capital.shares[vm.idx]
      refresh_founder_personal_data()
      vm.address = 'Адрес не указан'
    }

    $scope.$on('charter_capital:updated', function () {
      vm.share_type = charter_capital.share_type
    })

    function call_parent () {
      delete_founder_factory.update(vm.idx, vm.founder.full_name)
    }

    function refresh_founder_address () {
      var a = vm.founder.address
      vm.address = universal_trim(a.city) + ' ' + universal_trim(a.street) + ' ' + universal_trim(a.buildingType) + ' ' + universal_trim(a.building) + ' ' +
        universal_trim(a.housingType) + ' ' + universal_trim(a.housing) + ' ' + universal_trim(a.flatType) + ' ' + universal_trim(a.flat)
      if (vm.address.trim() === '') {
        vm.address = 'Адрес не указан'
      }
    }

    function refresh_founder_personal_data () {
      vm.founder.full_name = vm.founder.personal_data.last_name + ' ' +
        vm.founder.personal_data.name + ' ' +
        vm.founder.personal_data.mid_name
      if (vm.founder.full_name.trim() === '') {
        vm.founder.full_name = 'Учредитель не указан'
      }
    }

    function save_founder_address_changes () {
      if (!vm.edit_address) {
        refresh_founder_address()
        vm.address_valid = vm.validate_address()
        vm.edit_address = !vm.edit_address
      }
    }
    function save_founder_changes () {
      if (!vm.edit_info) {
        refresh_founder_personal_data()
        vm.name_valid = vm.validate_form('founder_info')
        vm.edit_info = !vm.edit_info
      }
    }

    function universal_trim (val) {
      return (val) ? val.trim() : ''
    }
  }
})()
