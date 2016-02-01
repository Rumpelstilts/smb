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
      this.number = ''
      this.date_of_issue = ''
      this.agency = ''
    }

    function RuPassport () {
      Passport.call(this)
      this.series = ''
      this.agency_code = ''
    }

    function ru () {
      return new RuPassport()
    }

    function foreign () {
      return new Passport()
    }
  }
})()
