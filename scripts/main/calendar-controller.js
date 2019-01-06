  /*===================================================================================*/
 /*                   			  C O N T R O L L E R 								  */
/*===================================================================================*/
function CalendarController() {
	var self = this;
	var myModel = null;
	var calendarEvent = null;
	var eventPopupM = null;
	var eventPopupV = null;
	var eventPopupC = null;

	var buttonBack = null;
	var buttonNext = null;
	var buttonNowDate = null;
	var buttonMonth = null;
	var buttonWeek = null;
	var buttonDay = null;

	var td = null;
	var show = null;
	var eventList = null;	
	var hash = null;

	self.init = function (model) {
		myModel = model;
		buttonBack = document.getElementById('back-but');
		buttonBack.addEventListener('click',self.back);

		buttonNext = document.getElementById('next-but');
		buttonNext.addEventListener('click',self.next);

		buttonNowDate = document.getElementById('today');
		buttonNowDate.addEventListener('click',self.nowDate);

		buttonMonth = document.getElementById('month-button');
		buttonMonth.addEventListener('click',self.setMonth);
		
		buttonWeek = document.getElementById('week-button');
		buttonWeek.addEventListener('click',self.setWeek);

		buttonDay = document.getElementById('day-button');
		buttonDay.addEventListener('click',self.setDay);		
	}

	window.onhashchange = function () {
			hash = location.hash

			switch(hash) {
				case '#autorize':
					sessionStorage.clear()
					window.location = 'index.html'
					var AutorizeMdl = new modelAutorize();
					break;
				case '#month':
					self.setMonth()
			 		break;
		 		case '#week':
		 			self.setWeek();
		 			break;
			 	case '#day':
			 		self.setDay();
			 		break;
		}
// Для каждого td устанавливаем события на клик по нему
	initEvent();
	}
/* ------------------------------------
Обработчик событий "Создать событие" 
по клику на td
--------------------------------------*/

	function initEvent() {
		$('td').each(function(index, el) {
			el.addEventListener('click', self.newEv);
		});
	}


    self.newEv = function(EO) {
    	var el = EO.target;
    	myModel.createEvent(el);
    	debugger;
    	eventPopupC.addShow();
    }

   	self.setMonth = function() {
   		window.location.hash = 'month';
     	myModel.updateView('month');

		
	}
	self.setWeek = function() {
		window.location.hash = 'week';
		myModel.updateView('week');

		
	}
	self.setDay = function() {
		window.location.hash = 'day';
		myModel.updateView('day');

	}

//--------- MONTH
	self.back = function() {
		myModel.updateModel(-1);

		}
    self.next = function() {
    	myModel.updateModel(+1);

	}
	self.nowDate = function () {
		myModel.updateModel(null);

	}
//---------- WEEK
	self.backWeek = function() {
		myModel.updateModel(-7) 
	}
    self.nextWeek = function() {
    	myModel.updateModel(+7) 
	}
	self.nowWeek = function () {
		myModel.updateModel(null);
	}

	self.update = function (name) {
		if (buttonBack != null) {
			self.removeEvent();
		};
		
		if (name == 'month' || name == null || name == 'day') {
		
			buttonBack.addEventListener('click',self.back);
			buttonNext.addEventListener('click',self.next);
			buttonNowDate.addEventListener('click',self.nowDate);
		}
		else if (name == 'week') {
			buttonBack.addEventListener('click',self.backWeek);
			buttonNext.addEventListener('click',self.nextWeek);
			buttonNowDate.addEventListener('click',self.nowWeek);
		}
	}
 	self.removeEvent = function () {
		buttonBack.removeEventListener('click',self.back);
		buttonNext.removeEventListener('click',self.next);
		buttonNowDate.removeEventListener('click',self.nowDate);

		buttonBack.removeEventListener('click',self.backWeek);
		buttonNext.removeEventListener('click',self.nextWeek);
		buttonNowDate.removeEventListener('click',self.nowWeek);
	}
}
	