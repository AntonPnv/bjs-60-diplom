// Реализация страницы «Вход и регистрация»
"use strict";

const userForm = new UserForm();

// Страница входа
userForm.loginFormCallback = data => {
	ApiConnector.login(data, (response) => {
		console.log(response);
		if (response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage('Произошла ошибка при авторизации!');
		}
	});
}
// Форма регистрации
userForm.registerFormCallback = data => {
	ApiConnector.register(data, (response) => {
		if (response.success) {
			location.reload();
		} else {
			userForm.setRegisterErrorMessage('Произошла ошибка при регистрации!');
		}
	});
}