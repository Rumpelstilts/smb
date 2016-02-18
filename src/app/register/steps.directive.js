/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbSteps', smbSteps)
  smbSteps.$inject = ['$compile', '$injector', 'toastr']
  /* @ngInject */
  function smbSteps ($compile, $injector, toastr) {
    // Usage:
    // <form smb-steps></form>
    //
    // Creates:
    // inits jquery.stepy
    //
    var smbSteps = {
      link: link
    }
    return smbSteps
    function link (scope, element, attrs) {
      var invalid
      element.stepy({
        backLabel: 'Назад',
        nextLabel: 'Далее',
        legend: true,
        enter: false,
        next: function (nextStepNumber) {
          switch (nextStepNumber) {
            default:
              invalid = 0
              $('form').each(function () {
                invalid += ($(this).valid()) ? 0 : 1
              })
              if (invalid > 0) {
                return false
              }
              console.log(invalid)
              break
          }
        },
        finish: function () {
          var valid = 0
          $('form').each(function () {
            valid += ($(this).valid()) ? 0 : 1
          })
        }
      })
    }

    function scroll_to_error () {
      var firstErrorElement = $('fieldset').filter(':visible').find('div.form-group.has-error').eq(0)
      if ($(firstErrorElement).length) {
        $('html, body').animate({
          scrollTop: firstErrorElement.offset().top
        }, 500)
      }
    }
  }
})()
