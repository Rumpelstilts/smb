/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbOkveds', smbOkveds)
  // smbOkveds.$inject = ['dependencies']
  /* @ngInject */
  function smbOkveds ( /* dependencies  */) {
    // Usage:
    // <div smb-okveds okveds = "some_okveds"></div>
    // Creates:
    //
    var smbOkveds = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'oc',
      link: link,
      restrict: 'A',
      templateUrl: 'app/okved/okveds.html',
      scope: {
        okveds: '=okveds'
      }
    }
    return smbOkveds
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  Controller.$inject = ['$http', '$uibModal']
  function Controller ($http, $uibModal) {
    var vm = this
    vm.okveds
    vm.set_main_okved = set_main_okved
    vm.call_delete_okved_modal = call_delete_okved_modal
    vm.call_okved_modal = call_okved_modal

    activate()

    function activate () {
      fetch_user_okveds()
    }

    function call_delete_okved_modal (idx) {
      var okved_data = {
        idx: idx,
        okveds: vm.okveds.chosen
      }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/okved/delete_okved_modal.html',
        controller: 'delete_okved_ctrl',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          okved_data: function () {
            return okved_data
          }
        }
      })
    }

    function call_okved_modal () {
      $uibModal.open({
        animation: true,
        templateUrl: 'app/okved/okved_modal.html',
        controller: 'okved_modal_ctrl',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          user_okveds: function () {
            return vm.okveds
          }
        }
      })
    }

    function fetch_user_okveds () {
      $http.get('json/okveds/user_okveds.json').success(function (data) {
        vm.okveds.chosen = data
      })
    }

    function set_main_okved (okved) {
      // uncheck all okveds
      for (var k in vm.okveds.chosen) {
        vm.okveds.chosen[k].main = false
      }
      okved.main = true
    }
  }
})()
