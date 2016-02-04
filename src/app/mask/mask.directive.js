/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbMask', smbMask)
  smbMask.$inject = ['$compile', '$injector']
  /* @ngInject */
  function smbMask ($compile, $injector) {
    // Usage:
    //
    // Creates:
    //
    var smbMask = {
      link: link,
      restrict: 'A'
    }
    return smbMask
    function link (scope, element, attrs) {
      switch (attrs.masktype) {
        case 'phone':
          // маска на номер телефон
          element.inputmask('+7 (999) 999-99-99')
          break

        case 'inn':
          // маска на ИНН - 12 цифр
          element.inputmask('9{12}')
          break
        case 'passportcode':
          // маска на серию паспорта
          element.inputmask('99 99')
          break
        case 'passportnum':
          // маска на номер паспорта
          element.inputmask('999999')
          break
        case 'passportagencycode':
          // кем выдан паспорт - код подразделения
          element.inputmask('999-999')
          break
        case 'dt':
          // даты
          element.inputmask('99.99.9999')
          break
        case 'zip':
          // маска на zip
          element.inputmask('999999')
          break
        case 'money':
          // маска на сумму денег - любое кол-во цифр [+ одна точка и две цифры после запятой]
          // [] - опционально
          element.inputmask('9{1,}.{0,1}9{0,2}')
          break
        default:
          break
      }
    }
  }
})()
