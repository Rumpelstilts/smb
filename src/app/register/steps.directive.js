/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbSteps', smbSteps)
  smbSteps.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbSteps ($compile, $injector) {
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
      var form_id = attrs['id']
      element.stepy({
        backLabel: 'Назад',
        nextLabel: 'Далее',
        legend: true,
        enter: false,
        next: function (nextStepNumber) {
          console.log(scope)
          if (!element.valid()) {
            scrollToError()
            return false
          }

          switch (form_id) {
            case 'registration-sp': {
              switch (nextStepNumber) {
                case 2:
                  // scope.registrationIp(scope.details.person)
                  break

                case 5:
                  // выбор оквэдов
                  if (scope.details.user_okveds.mainOkved === null) {
                    if (scope.details.user_okveds.okveds.length === 0) {
                      showError('Вы должны выбрать виды деятельности.')
                    } else {
                      showError('Вы должны выбрать основной ОКВЭД.')
                    }
                    return false
                  }
                  return true
              }
              }
          }
          return true
        },
        finish: function () {
          if (!element.valid()) {
            scrollToError()
            return false
          }

          alert('submit!')
        }
      })
    }
  }
})()
