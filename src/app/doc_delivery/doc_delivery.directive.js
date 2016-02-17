/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbDocDelivery', smbDocDelivery)
  // smbDocDelivery.$inject = ['dependencies']
  /* @ngInject */
  function smbDocDelivery () {
    // Usage:
    // <div smb-doc-delivery model = 'some_doc_delivery'></div>
    // Creates:
    //
    var smbDocDelivery = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      templateUrl: 'app/doc_delivery/doc_delivery.html',
      restrict: 'A',
      scope: {
        delivery: '=model'
      }
    }
    return smbDocDelivery
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
  }
})()
