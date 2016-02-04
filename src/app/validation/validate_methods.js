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

$.validator.addMethod('notExist', function (value, element) {
  return true
// todo uncomment after server-side
// $.ajax({
//	url: 'checkUserRegistered.do',
//	data: {
//		email: value
//	},
//	type: 'POST',
//	dataType: 'text',
//	async: false
// }).done(function (result) {
//	return result == 'user_exists'
// })
})

function convertStringToDateObject (formattedString) {
  var dateParts = formattedString.split('.')
  return new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0])
}
