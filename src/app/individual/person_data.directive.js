/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbPersonData', smbPersonData)
  smbPersonData.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbPersonData ($compile, $injector) {
    // Usage:
    // <div smb-person-data model = 'some_person'></div>
    //
    // Creates:
    // manages citizenship of person (individual)
    //
    var smbPersonData = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'pd',
      templateUrl: 'app/individual/person_data.html',
      link: link,
      restrict: 'A',
      scope: {
        person: '=model'
      }
    }
    return smbPersonData
    function link (scope, element, attrs) {
    }
  }
  /* @ngInject */
  function Controller () {
  }
})()
