/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbFounder', smbFounder)
  // smbFounder.$inject = ['dependencies']
  /* @ngInject */
  function smbFounder ( /*dependencies*/) {
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
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.address
    vm.edit_address = true
    vm.edit_info = true
    vm.edit_founder_address = edit_founder_address
    vm.edit_founder_info = edit_founder_info
    vm.name
    vm.save_founder_changes = save_founder_changes
    activate()

    function activate () {
      refresh_founder_personal_data()
      refresh_founder_address()
    }

    function edit_founder_address () {
      vm.edit_address = !vm.edit_address
    }

    function edit_founder_info () {
      vm.edit_info = !vm.edit_info
      setTimeout(function () {
        $('.founder_info').find('form').each(function () {
          $(this).valid()
        })
      }, 500)
    }

    function refresh_founder_address () {
      vm.address = 'Адрес'
    }

    function refresh_founder_personal_data () {
      if (vm.founder.personal_data.last_name.trim() === '' &&
        vm.founder.personal_data.name.trim() === '' &&
        vm.founder.personal_data.mid_name.trim() === ''
      ) {
        vm.name = 'Имя учредителя'
      } else {
        vm.name = vm.founder.personal_data.last_name + ' ' +
          vm.founder.personal_data.name + ' ' +
          vm.founder.personal_data.mid_name
      }
    }

    function save_founder_changes () {
      refresh_founder_personal_data()
      vm.edit_info = !vm.edit_info
    }
  }
})()
