/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .service('error_placement_service', error_placement_service)
  function error_placement_service () {
    this.set_rule = set_rule
    // //////////////
    function set_rule (error, errorElement) {
      $(errorElement).closest('.form-group').append(error)
    }
  }
})()
