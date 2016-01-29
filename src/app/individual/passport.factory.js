/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('passport', passport)
  function passport () {
    var service = {
      ru: ru,
      foreign: foreign
    }

    return service

    // //////////////
    function Passport () {
      this.series = ''
      this.number = ''
      this.date_of_issue = ''
      this.agency = ''
    }

    function ru () {
      Passport.call(this)
      this.agency_code = ''
    }

    function foreign () {
      return new Passport()
    }
  }
})()
