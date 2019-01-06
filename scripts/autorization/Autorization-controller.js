  /*===================================================================================*/
 /*                   			  C O N T R O L L E R 								  */
/*===================================================================================*/
function controllerAutorize() {
	
	var myModel = null;
	var myView = null;
	var frm = null;
	var buttonSubmit = null;
	var buttonReg = null;
	var self = this;
	
	this.init = function (model,view) {
		frm = document.forms['autoriz-form'];
		myModel = model;
		myView = view;
		buttonSubmit = document.getElementById('submit-button');
		buttonSubmit.addEventListener('click',this.loginUser);

		buttonReg = document.getElementById('reg-button');
		buttonReg.addEventListener('click',this.registered);

	}
	this.loginUser = function () {
		
		if (!$(frm).valid()){
			alert('Заполните все поля в соответствии с правилами')
		}
		else {
			var user = {
			name: frm.elements[0].value,
			password: frm.elements[1].value
		}
		myModel.loginUser(user);
		}
	}
	this.registered = function () {
		
		if (!$(frm).valid()){
			alert('Заполните все поля в соответствии с правилами')
		}
		else {
			var user = {
			name: frm.elements[0].value,
			password: frm.elements[1].value
		}
		myModel.addUser(user);
		}
		
	}

}
	
