/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .factory('individual', individual)
  // individual.$inject = ['dependencies']
  /* @ngInject */
  function individual () {
    return individual
    // //////////////  

    function Person () {
      this.name = ''
      this.mid_name = ''
      this.last_name = ''
      this.birth_date = ''
      this.birth_location = ''
      this.gender = ''
      this.citizenship = 'ru'
    }

    function Individual () {
      Person.call(this)
      this.country = ''
      this.name_roman = ''
      this.mid_name_roman = ''
      this.last_name_roman = ''
    }

    function individual () {
      return new Individual()
    }
  }
})()
