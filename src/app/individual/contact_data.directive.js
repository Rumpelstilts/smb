/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbContactData', smbContactData)
  smbContactData.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbContactData ($compile, $injector) {
    // Usage:
    // <div smb-contact-data model = 'some_person'></div>
    // Creates:
    //
    var smbContactData = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'cdc',
      templateUrl: 'app/individual/contact_data.html',
      link: link,
      restrict: 'A',
      scope: {
        contact: '=model'
      }
    }
    return smbContactData
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
  }
})()
