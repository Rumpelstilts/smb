/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .service('unhighlight_service', unhighlight_service)
  function unhighlight_service () {
    this.set_rule = set_rule
    // //////////////
    function set_rule (element, errorClass, validClass) {
      $(element).closest('.form-group').removeClass(errorClass).addClass(validClass)
    }
  }
})()
