/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: RU (Russia, Russian)
 */
$.extend($.validator.messages, {
	required: "Это поле обязательно для заполнения.",
	maxlength: $.validator.format("Пожалуйста, введите не более {0} символов."),
	minlength: $.validator.format("Пожалуйста, введите не менее {0} символов."),
	rangelength: $.validator.format("Введенное количество символов не может быть меньше {0} или превышать {1} символов."),
	email: "Пожалуйста, введите корректный email адрес.",
	url: "Пожалуйста, введите корректный URL.",
	number: "Введенное значение должно быть числом.",
	digits: "Вы можете ввести только цифры.",
	equalTo: "Введенные значения должны быть равны.",
	range: $.validator.format("Пожалуйста, введите значение между {0} и {1}."),
	max: $.validator.format("Пожалуйста, введите значение меньше или равное {0}."),
	min: $.validator.format("Пожалуйста, введите значение, большее или равное {0}."),

	notExist: "Пользователь с таким email уже существует.",
	mobile: "Пожалуйста, введите корректный номер телефона. Требуемый формат: +7&nbsp;(000)&nbsp;000-00-00",
	password: "Пароль может содержать только буквы и цифры",
	date: "Пожалуйста, введите корректную дату. Требуемый формат: ДД.ММ.ГГГГ.",
	birthDate: "С момента рождения должно пройти не более 80 лет и не менее 18 лет.",
	passportDate: "С даты рождения до даты выдачи паспорта должно пройти не менее 14 лет. Дата не может быть позже текущей.",
	dateInPast: "Дата не может быть позже текущей.",
	permitDocumentExpiry: "Дата окончания действия паспорта не может быть меньше даты выдачи паспорта. Дата окончания действия не может быть меньше текущей даты.",

	cyrillicName: "Можно использовать только кириллические буквы, первая буква — заглавная.",
	latinName: "Можно использовать только латинские буквы, первая буква — заглавная.",
	passportCode: "Введите корректное значение серии паспорта.",
	passportNum: "Введите корректное значение номера паспорта.",
	passportAgencyCode: "Введите корректное значение кода подразделения.",
	inn: "Введите корректное значение ИНН."
});