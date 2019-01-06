jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

  /*===================================================================================*/
 /*                   					 M O D E L 				    				  */
/*===================================================================================*/
function modelAutorize() {
	var myView = null;
	this.user = {
		name: null,
		event: {}
	};

/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ MODEL
-----------------------------------*/
	this.init = function (view) {
		myView = view;
		window.location.hash = 'autorize';
	};
/*-----------------------------------
	МЕТОД LOG IN user
-----------------------------------*/	
	this.loginUser = function (_user){
		var user = _user;
		
		if (user.name in localStorage) {

			var localPass = JSON.parse(localStorage[user.name]).password;

			if (user.password == localPass){
				alert('Добро пожаловать в календарь!')
				sessionStorage.setItem('whoLogin', user.name);
				console.log('Вы вошли в календарь');
				myView.updateView();
			}
			
			else if (user.password != localStorage[user.name].password){
				alert ("Проверьте имя пользователя и пароль")
			}
		}
		else {
			alert('Такого пользвателя не существует. Зарегистрируйтесь!')
		}
	}

/*-----------------------------------
	МЕТОД REGISTRATED user
-----------------------------------*/
	this.addUser = function (_user){
		var user = _user;
		var userJSON = JSON.stringify(user);
		localStorage.setItem(user['name'], userJSON);
		alert ('Регистрация прошла успешно. Войдите')
	}

	var View = new viewAutorize();
	View.init(this);
	var Controller = new controllerAutorize();
		Controller.init(this,myView);
}