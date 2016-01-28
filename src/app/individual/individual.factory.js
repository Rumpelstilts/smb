/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('individual', individual)
  individual.$inject = ['dependencies']
  /* @ngInject */
  function individual (dependencies) {
    var service = {
      russian: russian,
      foreigner: foreigner
    }
    return service
    // //////////////
    function russian () {
    }
    function foreigner () {
      // body...
    }

    function Person () {
      this.name = ''
      this.last_name = ''
      this.birth_date = ''
      this.birth_location = ''
      this.gender = ''
    }

    function Russian_citizen () {
      Person.call(this)
      this.mid_name = ''
    }
  }
})()
