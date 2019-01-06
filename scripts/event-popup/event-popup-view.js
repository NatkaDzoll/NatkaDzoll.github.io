  /*===================================================================================*/
 /*                   				   V I E W      								  */
/*===================================================================================*/
function EventPopupView() {
	var self = this;
	var myModel = null;
	var myField = null;


/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ MODEL
-----------------------------------*/
	self.init = function (model) {
		myModel = model;
		myModel.init(self);
	};

	self.createEventPopup = function(title, ev, posClickX, posClickY){
		 debugger;
		var popup = document.createElement('div');
		var popupBack = document.createElement('div');
		popup.id = 'eventList';
		popupBack.id = 'eventListBack';
		popup.style.left = posClickX +'px';
		popup.style.top = posClickY + 'px';
		document.body.appendChild(popupBack);
		popupBack.appendChild(popup);
		
		var dataTitle = document.createElement('div');
		dataTitle.innerHTML = title;
		dataTitle.id = 'dataTittle';
		popup.appendChild(dataTitle);
		var ul = document.createElement('ul');
		popup.appendChild(ul);
		ev.each(function(index, el) {
			el.style.display = 'block';
		});
		$(ul).append(ev);
	}
}