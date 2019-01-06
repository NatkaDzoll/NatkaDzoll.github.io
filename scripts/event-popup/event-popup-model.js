  /*===================================================================================*/
 /*             		 M O D E L 	- СОБЫТИЯ ЕЖЕДНЕВНИКА POPUP		   				  */
/*===================================================================================*/

function EventPopupModel() {
	var self = this;
	var myView = null;
	var Controller = null;

	self.init = function (view) {
		myView = view;
	}
	/*self.updateButton = function(){
		Controller.addShow;
	}*/
/*-----------------------------------
	находим координаты ячейки
	по которой произвели click
------------------------------------*/
	self.createEventMenu = function(EO){
		var td = EO.target.parentNode; 
		var posClickX = td.offsetLeft;
		var posClickY = td.offsetTop;
	/*-----------------------------------
		инициализируем ее по дате
	------------------------------------*/
		var title = $(td).attr('data-date');
		debugger;
		var ev = $(td).find('ol:hidden, ol:visible').clone();
		myView.createEventPopup(title, ev, posClickX, posClickY );
	}

/*-----------------------------------
	создаем View и инициализируем 
------------------------------------*/	
	var View = new EventPopupView();
	View.init(self);
/*-----------------------------------
	создаем Controller и инициализируем 
------------------------------------*/	
	if (!Controller) {
		Controller = new EventPopupController ();
		Controller.init(self);
	}
};
