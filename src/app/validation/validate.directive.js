/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbValidate', smbValidate)
  smbValidate.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbValidate ($compile, $injector) {
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
      var form_id = attrs['id']

      var rules = {}
      var messages = {}

      switch (form_id) {
        case 'user-login-form':
          rules = {
            email: {
              required: true,
              email: true
            },
            password: {
              required: true,
              minlength: 5,
              password: true
            }
          }
          break

        case 'user-registration-form':
          rules = {
            email: {
              required: true,
              email: true,
              notExist: true
            },
            password: {
              required: true,
              minlength: 5,
              password: true
            },
            passwordRepeat: {
              required: true,
              minlength: 5,
              password: true,
              equalTo: '#password'
            },
            serviceAgreement: {
              required: true
            },
            personalDataAgreement: {
              required: true
            }
          }
          messages = {
            passwordRepeat: {
              equalTo: 'Введенные пароли должны совпадать.'
            }
          }
          break

        case 'partner-registration-form':
          rules = {
            partnerType: {
              required: true
            },
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
            email: {
              required: true,
              email: true,
              notExist: true
            },
            phone: {
              required: true,
              mobile: true
            },
            company: {
              required: true
            },
            position: {
              required: true
            },
            password: {
              required: true,
              minlength: 5,
              password: true
            },
            passwordRepeat: {
              required: true,
              minlength: 5,
              password: true,
              equalTo: '#password'
            }
          }
          messages = {
            passwordRepeat: {
              equalTo: 'Введенные пароли должны совпадать.'
            }
          }
          break

        case 'user-restore-password-form':
          rules = {
            email: {
              required: true,
              email: true
            }
          }
          break

        case 'confirm-email':
          rules = {
            code: {
              required: true
            }
          }
          break

        case 'register_ie':
          rules = {
            citizenshipCode: {
              required: true
            },
            country: {
              required: true
            },
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
            },

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
            },

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
            },
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
            },
            phone: {
              required: true,
              mobile: true
            },
            email: {
              required: true,
              email: true
            },
            inn: {
              inn: true
            },

            docDelivery: {
              required: true
            },

            taxMode: {
              required: true
            },
            taxType: {
              required: true
            },
            taxPayer: {
              required: true
            },

            bankTariff: {
              required: true
            },
            departmentCity: {
              required: true
            },
            departmentName: {
              required: true
            }
          }

          messages = {
            permitDocumentDt: {
              passportDate: 'С даты рождения до даты выдачи документа должно пройти не менее 14 лет. Дата не может быть позже текущей.'
            }
          }
          break

        case 'captcha-inn':
          rules = {
            captchaInn: {
              required: true
            }
          }
          break
      }

      element.validate({
        rules: rules,
        messages: messages,
        errorClass: 'has-error',
        validClass: 'has-success',
        errorPlacement: function (error, errorElement) {
          $(errorElement).closest('.form-group').append(error)
        },
        highlight: function (element, errorClass, validClass) {
          $(element).closest('.form-group').addClass(errorClass).removeClass(validClass)
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).closest('.form-group').removeClass(errorClass).addClass(validClass)
        }
      })
    }
  }
})()