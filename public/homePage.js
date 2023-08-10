// Реализация страницы «Личный кабинет пользователя»
"use strict";

// Выход из личного кабинета

const logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
}

// Получение информации о пользователе

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

function exchangeRates() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
}

exchangeRates();

const updateInterval = setInterval(exchangeRates, 60000);

// Операции с деньгами

const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Баланс успешно пополнен!');
		} else {
			moneyManager.setMessage(false, 'Произошла ошибка!');
		}
	});
}

// Конвертирование валюты
moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация успешно выполнена!');
		} else {
			moneyManager.setMessage(false, 'Произошла ошибка!');
		}
	});
}

// Перевод валюты
moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Перевод успешно выполнен!');
		} else {
			moneyManager.setMessage(false, 'Произошла ошибка!');
		}
	});
}

// Работа с избранным списком

const favoritesWidget = new FavoritesWidget();

// Запрос списка избранного
function updateFavorites() {
	ApiConnector.getFavorites((response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		}
	});
}

updateFavorites();

// Добавление пользователя в список избранных
favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			updateFavorites();
			favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в список избранных!')
		} else {
			favoritesWidget.setMessage(false, 'Произошла ошибка!')
		}
	});
}

// Удаление пользователя из списка избранных
favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			updateFavorites();
			favoritesWidget.setMessage(true, 'Пользователь успешно удален из список избранных!')
		} else {
			favoritesWidget.setMessage(false, 'Произошла ошибка!')
		}
	});
}