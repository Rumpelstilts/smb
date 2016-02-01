/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('contact_data', contact_data)
  /* @ngInject */
  function contact_data () {
    function service () {
      return new Contact()
    }
    return service
    // //////////////
    function Contact () {
      this.email = ''
      this.phone_num = ''
    }
  }
})()
