/*global $*/
$.validator.addMethod('email', function (value) {
  return /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)
})

$.validator.addMethod('mobile', function (value) {
  return /^\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}$/.test(value)
})

$.validator.addMethod('password', function (value) {
  return /^[\D,\d]+$/.test(value) && /^[^\s]+$/.test(value)
})

$.validator.addMethod('date', function (value) {
  return /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(value)
})
$.validator.addMethod('cyrillicName', function (value) {
  return /^[А-ЯЁ][а-яё]+([ |-][А-ЯЁ][а-яё]+){0,2}$/.test(value)
})

$.validator.addMethod('latinName', function (value) {
  return value == '' || /^[A-Z][a-z]+([ |-][A-Z][a-z]+){0,2}$/.test(value)
})

$.validator.addMethod('passportCode', function (value, element) {
  return /(^\d{2}\s\d{2}$)/.test(value)
})
$.validator.addMethod('passportNum', function (value, element) {
  return /(^\d{6}$)/.test(value)
})
$.validator.addMethod('passportAgencyCode', function (value, element) {
  return /(^\d{3}-\d{3}$)/.test(value)
})

$.validator.addMethod('zip_code', function (value, element) {
  return (value.length === 6)
})

$.validator.addMethod('inn', function (value) {
  return value == '' || /(^\d{12}$)/.test(value)
})

$.validator.addMethod('birthDate', function (value, element) {
  var birthTimestamp = convertStringToDateObject(value).getTime(),
    currentTime = new Date().getTime(),
    yearsDiff18 = 18 * 365 * 24 * 60 * 60 * 1000,
    yearsDiff80 = 80 * 365 * 24 * 60 * 60 * 1000

  return (birthTimestamp >= (currentTime - yearsDiff80))
  && (birthTimestamp <= (currentTime - yearsDiff18))
})

$.validator.addMethod('passportDate', function (value, element) {
  var passportTimestamp = convertStringToDateObject(value).getTime(),
    currentTime = new Date().getTime(),
    birthDt = $(element).closest('fieldset').find('input[name="birthDate"]').val(),
    birthTimestamp = convertStringToDateObject(birthDt).getTime(),
    yearsDiff14 = 14 * 365 * 24 * 60 * 60 * 1000

  return (passportTimestamp >= (birthTimestamp + yearsDiff14))
  && (passportTimestamp < currentTime)
})

$.validator.addMethod('dateInPast', function (value, element) {
  var passportTimestamp = convertStringToDateObject(value).getTime(),
    currentTime = new Date().getTime()

  return passportTimestamp < currentTime
})

$.validator.addMethod('permitDocumentExpiry', function (value, element) {
  var permitDocumentExpiryTimestamp = convertStringToDateObject(value).getTime(),
    currentTime = new Date().getTime(),
    permitDocumentDt = $(element).closest('fieldset').find('input[name="permitDocumentDt"]').val(),
    permitDocumentTimestamp = convertStringToDateObject(permitDocumentDt).getTime()

  return (permitDocumentExpiryTimestamp > permitDocumentTimestamp)
  && (permitDocumentExpiryTimestamp > currentTime)
})

// charter capital shares
$.validator.addMethod('positive_and_number', function (value) {
  value = value.replace(/,/g, '.')
  var res = parseFloat(value)
  return (!isNaN(res) && res > 0)
})

$.validator.addMethod('percent', function (value) {
  var res = 0
  $('.percent').each(function () {
    var current = parseFloat($(this).val().replace(/,/g, '.'))
    if (isNaN(current)) {
      current = 100
    }
    res += current
  })
  return (res === 100)
})

$.validator.addMethod('decimal_fraction', function (value) {
  var res = 0
  $('.decimal_fraction').each(function () {
    var current = parseFloat($(this).val().replace(/,/g, '.'))
    if (isNaN(current)) {
      current = 1
    }
    res += current
  })
  return (res === 1)
})

$.validator.addMethod('integer', function (value) {
  value = value.replace(/,/g, '.')
  var res = parseFloat(value)
  return ((res % 1) === 0)
})

$.validator.addMethod('two_digits_fractional', function (value) {
  value = value.replace(/,/g, '.')
  var remainder = value.split('.')
  return remainder[1] ? (remainder[1].length <= 2) : true
})

$.validator.addMethod('simple_fraction', function (value) {
  var sum = 0
  var fractions = []
  var common_den = 1
  $('.simple_fraction').each(function () {
    var num = parseFloat($(this).find('.numerator').val().replace(/,/g, '.'))
    var den = parseFloat($(this).find('.denumerator').val().replace(/,/g, '.'))
    if (isNaN(den)) {
      den = 1
    }
    if (isNaN(num)) {
      num = 1
    }
    fractions.push({num: num, den: den})
    common_den *= den
  })

  for (var i = 0; i < fractions.length; i++) {
    sum += fractions[i].num * (common_den / fractions[i].den)
  }

  return ((sum / common_den) === 1)
})

$.validator.addMethod('charter_capital', function (value) {
  var num = parseFloat(value)
  return ((num >= 10000) && (num <= 99999999999))
})

$.validator.addMethod('selectize', function (value, element) {
  return (element.innerText !== '')
})

function convertStringToDateObject (formattedString) {
  var dateParts = formattedString.split('.')
  return new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0])
}
