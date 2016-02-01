/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('permission', permission)
  /* @ngInject */
  function permission () {
    function service () {
      return new Permission()
    }
    return service
    // //////////////
    function Permission () {
      this.permit_doc_type = 1
      this.number = ''
      this.date_of_issue = ''
      this.exp_date = ''
      this.agency = ''
    }
  }
})()
