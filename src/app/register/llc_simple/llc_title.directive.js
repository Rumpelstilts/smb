/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbLlcTitle', smbLlcTitle)
  /* @ngInject */
  function smbLlcTitle () {
    // Usage:
    // <div smb-llc-title model = "some_llc"><div>
    // Creates:
    //
    var smbLlcTitle = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'A',
      templateUrl: 'app/register/llc_simple/llc_title.html',
      scope: {
        title: '=model'
      }
    }
    return smbLlcTitle
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
    var vm = this
    vm.title
    vm.update_name = update_name
    activate()

    function activate () {
      vm.title = {
        name: '',
        name_full: '',
        name_short: '',
        english: {
          name_full: '',
          name_short: ''
        }
      }
    }

    function update_name () {
      if (vm.title.name !== '') {
        vm.title.name_full = 'Общество с ограниченной ответственностью «' + vm.title.name + '»'
        vm.title.name_short = 'ООО «' + vm.title.name + '»'
      } else {
        vm.title.name_full = ''
        vm.title.name_short = ''
      }
    }
  }
})()
