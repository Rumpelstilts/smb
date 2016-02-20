/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbValidate', smbValidate)
  smbValidate.$inject = ['$compile', '$injector', 'charter_capital', 'highlight_service', 'unhighlight_service', 'error_placement_service']
  /* @ngInject */
  function smbValidate ($compile, $injector, charter_capital, highlight_service, unhighlight_service, error_placement_service) {
    // Usage:
    // <form smb-validate></form>
    // Creates:
    //
    var smbValidate = {
      link: link,
      restrict: 'A'
    }
    return smbValidate
    function link (scope, element, attrs) {
      // var form_id = attrs['id']

      var rules = {}
      var messages = {}

      switch (attrs['entity']) {
        case 'address':
          rules = {
            region: {
              required: true
            },
            city: {
              required: true
            },
            street: {
              required: true
            },
            building: {
              required: true
            },
            building_type: {
              required: true
            },
            zip: {
              required: true,
              number: true,
              zip_code: true
            }
          }
          break
        case 'charter_capital':
          rules = {
            amount: {
              required: true,
              number: true,
              charter_capital: true,
              two_digits_fractional: true
            }
          }
          break
        case 'citizenship':
          rules = {
            citizenshipCode: {
              required: true
            },
            citizenship: {
              selectize: true
            },
            country: {
              selectize: true
            }
          }
          break
        case 'contact_data':
          rules = {
            phone: {
              required: true,
              mobile: true
            },
            email: {
              required: true,
              email: true
            }
          }
          break
        case 'inn':
          rules = {
            inn: {
              inn: true
            }
          }
          break
        case 'passport_ru':
          rules = {
            passportCode: {
              required: true,
              passportCode: true
            },
            passportNum: {
              required: true,
              passportNum: true
            },
            passportDt: {
              required: true,
              date: true,
              passportDate: true
            },
            passportAgency: {
              required: true
            },
            passportAgencyCode: {
              required: true,
              passportAgencyCode: true
            }
          }
          break
        case 'passport_foreign':
          rules = {
            passportNumForeigner: {
              required: true
            },
            passportDtForeigner: {
              required: true,
              date: true,
              passportDate: true
            },
            passportAgencyForeigner: {
              required: true
            }
          }
          break
        case 'permission':
          rules = {
            permitDocumentType: {
              required: true
            },
            permitDocumentNumber: {
              required: true
            },
            permitDocumentDt: {
              required: true,
              date: true,
              passportDate: true
            },
            permitDocumentExpiry: {
              required: true,
              date: true,
              permitDocumentExpiry: true
            },
            permitDocumentAgency: {
              required: true
            }
          }
          break
        case 'personal_data':
          rules = {
            lastname: {
              required: true,
              cyrillicName: true
            },
            name: {
              required: true,
              cyrillicName: true
            },
            middlename: {
              required: true,
              cyrillicName: true
            },
            birthPlace: {
              required: true
            },
            birthDate: {
              required: true,
              date: true,
              birthDate: true
            },
            sex: {
              required: true
            },
            lastnameForeigner: {
              required: true,
              latinName: true
            },
            nameForeigner: {
              required: true,
              latinName: true
            },
            middlenameForeigner: {
              latinName: true
            }
          }
          break
        case 'share':
          rules = {
            percent: {
              required: true,
              positive_and_number: true,
              two_digits_fractional: true,
              percent: true
            },
            decimal_fraction: {
              required: true,
              positive_and_number: true,
              two_digits_fractional: true,
              decimal_fraction: true
            },
            numerator: {
              required: true,
              positive_and_number: true,
              integer: true,
              simple_fraction: true
            },
            denumerator: {
              required: true,
              positive_and_number: true,
              integer: true,
              simple_fraction: true
            }
          }
          break
      }

      if (attrs['tlp']) {
        switch (attrs['tlp']) {
          case 'charter_capital':
            scope.tooltip = {
              text: '',
              enabled: false
            }
            element.validate({
              rules: rules,
              messages: messages,
              errorClass: 'has-error',
              validClass: 'has-success',
              errorPlacement: function (error, errorElement) {
                scope.tooltip.text = $(error).html()
              },
              highlight: function (element, errorClass, validClass) {
                $(element).closest('.form-group').addClass(errorClass).removeClass(validClass)
              },
              unhighlight: function (element, errorClass, validClass) {
                $('.form-group').removeClass(errorClass).addClass(validClass)
                scope.tooltip.enabled = false
              }
            })
            break
          case 'charter_shares':
            scope.tooltip = {
              decimal_fraction: {},
              denumerator: {},
              numerator: {},
              percent: {}
            }
            element.validate({
              ignore: '',
              rules: rules,
              messages: messages,
              errorClass: 'has-error',
              validClass: 'has-success',
              errorPlacement: function (error, errorElement) {
                var name = $(errorElement).attr('name')
                var idx = $(errorElement).attr('founder')
                scope.tooltip[name].text = $(error).html()
                scope.$parent.$parent.tooltips[idx] = scope.tooltip
              },
              highlight: function (element, errorClass, validClass) {
                $(element).closest('.input-wrapper').addClass(errorClass).removeClass(validClass)
                var name = $(element).attr('name')
                var idx = $(element).attr('founder')
                scope.tooltip[name].enabled = true
                if (!scope.$parent.$parent.tooltips) { // if common parent doesn't exist
                  scope.$parent.$parent.tooltips = {}
                }
                scope.$parent.$parent.tooltips[idx] = scope.tooltip
                charter_capital.shares_valid = false
                charter_capital.undefine_shares()
                scope.$apply()
              },
              unhighlight: function (element, errorClass, validClass) {
                $('.input-wrapper').removeClass(errorClass).addClass(validClass)
                var name = $(element).attr('name')
                var idx = $(element).attr('founder')
                scope.tooltip[name].enabled = false
                if (!scope.$parent.$parent.tooltips) { // if common parent doesn't exist
                  scope.$parent.$parent.tooltips = {}
                }
                // when all inputs are valid, disable their tooltips
                scope.$parent.$parent.tooltips[idx] = scope.tooltip
                for (var founder_id in scope.$parent.$parent.tooltips) {
                  // goin' through tooltips by founder id
                  if (scope.$parent.$parent.tooltips.hasOwnProperty(founder_id)) {
                    for (name in scope.$parent.$parent.tooltips[founder_id]) {
                      // search for input name in each tooltip obj
                      if (scope.$parent.$parent.tooltips[founder_id].hasOwnProperty(name)) {
                        scope.$parent.$parent.tooltips[founder_id][name].enabled = false
                      }
                    }
                  }
                }
                charter_capital.shares_valid = true
                charter_capital.calculate_shares()
                scope.$apply()
              }
            })
            break
        }
      } else {
        element.validate({
          ignore: ':hidden:not(.validate-require)',
          rules: rules,
          messages: messages,
          errorClass: 'has-error',
          validClass: 'has-success',
          errorPlacement: function (error, errorElement) {
            error_placement_service.set_rule(error, errorElement)
          },
          highlight: function (element, errorClass, validClass) {
            highlight_service.set_rule(element, errorClass, validClass)
          },
          unhighlight: function (element, errorClass, validClass) {
            unhighlight_service.set_rule(element, errorClass, validClass)
          }
        })
      }
    }
  }
})()
