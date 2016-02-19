/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .service('highlight_service', highlight_service)
  function highlight_service () {
    this.set_rule = set_rule
    // //////////////
    function set_rule (element, errorClass, validClass) {
      $(element).closest('.form-group').addClass(errorClass).removeClass(validClass)
    }
  }
})()
