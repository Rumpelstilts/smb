/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbSteps', smbSteps)
  smbSteps.$inject = ['$compile', '$injector', 'toastr', 'founders_model_validator']
  /* @ngInject */
  function smbSteps ($compile, $injector, toastr, founders_model_validator) {
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
      function default_form_validation () {
        invalid = 0
        $('form').each(function () {
          invalid += ($(this).valid()) ? 0 : 1
        })
        return (invalid === 0)
      }
      element.stepy({
        backLabel: 'Назад',
        nextLabel: 'Далее',
        legend: true,
        enter: false,
        next: function (nextStepNumber) {
          if (attrs['id'] === 'registration_llc') {
            switch (nextStepNumber) {
              case 4:
                founders_model_validator.validate()
                break
              default:
                return /*default_form_validation()*/
            }
          } else {
            switch (nextStepNumber) {
              case 2:
                if ($('.alert.alert-info:not(:hidden)').length > 0) {
                  toastr.error('Выберите адрес.', 'Ошибка!', {
                    'positionClass': 'toast-top-center'
                  })
                  return false
                } else {
                  if ($('form:not(:hidden)').length === 0) {
                    console.log(scope)
                    // if custom input form is collpased, check model
                    for (var prop in scope.ie.address) {
                      if (scope.ie.address.hasOwnProperty(prop)) {
                        // if prop is required
                        if (prop !== 'housing' && prop !== 'housingType' && prop !== 'flat' && prop !== 'flatType') {
                          // if null or ''
                          if (!scope.ie.address[prop] || scope.ie.address[prop] === '') {
                            toastr.error('Заполните все обязательные поля, выбрав из подсказки или заполнив вручную.', 'Ошибка!', {
                              'positionClass': 'toast-top-center'
                            })
                            return false
                          }
                        }
                      }
                    }
                    console.log('123')
                  } else {
                    return default_form_validation()
                  }
                }
                break
              case 5:
                var main_exist = false
                if (scope.ie.okveds.chosen.length === 0) {
                  toastr.error('Вы не выбрали ни одного ОКВЭДа.', 'Ошибка!', {
                    'positionClass': 'toast-top-center'
                  })
                  return false
                } else {
                  for (var i = 0; i < scope.ie.okveds.chosen.length; i++) {
                    if (scope.ie.okveds.chosen[i].main) {
                      main_exist = true
                    }
                  }
                  if (!main_exist) {
                    toastr.error('Выберите основной ОКВЭД.', 'Ошибка!', {
                      'positionClass': 'toast-top-center'
                    })
                    return false
                  } else {
                    toastr.clear()
                  }
                }
                break
              default:
                return default_form_validation()
            }
          }

          console.log(scope)
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
