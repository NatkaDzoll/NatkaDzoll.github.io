  /*===================================================================================*/
 /*                   					V I E W 									  */
/*===================================================================================*/
function viewAutorize() {
	var myModel = null;
	var formBox = null;
	var calendar = null;
	var autBox = null; 
	var eventPopupM = null;
	var	eventPopupV = null;
	var	eventPopupC = null;

	var userName = null;
	var password = null;

/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ VIEW
-----------------------------------*/
	this.init = function (model) {
		myModel = model;
		myModel.init(this);
		
		$('#calendar-box').hide();

		autBox =  document.createElement('div');
		autBox.id = 'autBox';
		document.body.appendChild(autBox);

		var header = document.createElement('div');
		header.id = 'aut-header';
		autBox.appendChild(header);

		var headerText = document.createElement('div');
		headerText.id = 'aut-header-text';
		headerText.innerHTML = 'MyCalendar';
		header.appendChild(headerText);

		formBox = document.createElement('div');
		formBox.id = 'form-box';
		autBox.appendChild(formBox);

		var formTitile = document.createElement('div');
		formTitile.id = 'form-title';
		formTitile.innerHTML = 'Авторизация';
		formBox.appendChild(formTitile);

		var formBody= document.createElement('div');
		formBody.id = 'form-body';
		formBox.appendChild(formBody);

		var form = document.createElement('form');
		form.id = 'aut-form';
		form.name = 'autoriz-form';
		form.className = 'autorize';
		formBody.appendChild(form);
		
//------
		//var errorBox = document.createElement('div');

		var namefield = document.createElement('div');
		namefield.className = 'autorize-row';
		form.appendChild(namefield);

		var label = document.createElement('label');
		label.innerHTML = 'Введите имя ';
		namefield.appendChild(label);

		var input = document.createElement('input');
		input.type = 'text';
		input.name = 'username';
		namefield.appendChild(input);

		var passwordfield = document.createElement('div');
		passwordfield.className = 'autorize-row';
		form.appendChild(passwordfield);

		var label = document.createElement('label');
		label.innerHTML = 'Введите пароль';
		passwordfield.appendChild(label);

		var input = document.createElement('input');
		input.type = 'password';
		input.name= 'password';
		passwordfield.appendChild(input);
/*
		var reapPasswordfield = document.createElement('div');
		reapPasswordfield.className = 'autorize-row';
		myField.appendChild(reapPasswordfield);

		var label = document.createElement('label');
		label.innerHTML = 'Повторите пароль ';
		reapPasswordfield.appendChild(label);

		var input = document.createElement('input');
		input.style.type = 'text';
		reapPasswordfield.appendChild(input);
*/
		var submit = document.createElement('div');
		submit.className = 'submit-box';
		form.appendChild(submit);
		
		var button = document.createElement('button');
		button.className = 'autorize-button';
		button.id = 'submit-button';
		submit.appendChild(button);

		var textButton = document.createElement('span');
		textButton.innerHTML = 'Войти';
		button.appendChild(textButton);

		var button = document.createElement('button');
		button.className = 'autorize-button';
		button.id = 'reg-button';
		submit.appendChild(button);
		
		var textButton = document.createElement('span');
		textButton.innerHTML = 'Зарегистрироваться';
		button.appendChild(textButton);

		
		$('form').validate ({
			rules: {
				username: {required: true, minlength:3 },
				password: {required: true,  minlength:3 }
			},
			
			messages: {
				username: {required: 'Введите имя пользователя',
							minlength: 'Введите не менее 3 символов'},

				password: {required: 'Введите пароль',
							minlength: 'Введите не менее 3 символов'}
			}
		});
	};
//--------------------- вынести в ммодель PAGE
	this.updateView = function(){
		$('#autBox').hide();
		$('#calendar-box').show();
			
		window.location.hash = 'month';		
		calendar = new monthModel();
		
		// var eventPopup = new EventPopupModel();
	
	}
}