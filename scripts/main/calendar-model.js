   /*===================================================================================*/
 /*                   					 M O D E L 				    				  */
/*===================================================================================*/
function monthModel() {
	var self = this;
	var myView = null;
	var Controller = null;
	var name = null;
	var selectedDate = {};
	self.eventHash = {};
/*-----------------------------------
	ВЫБРАННАЯ ДАТА
-----------------------------------*/
	self.nowDate = new Date();
/*-----------------------------------
	НАЗВАНИЕ МЕСЯЦЕВ
-----------------------------------*/
	self.monthName = [
	  'Январь', 'Февраль', 'Март', 'Апрель',
	  'Май', 'Июнь', 'Июль', 'Август',
	  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	];
/*-----------------------------------
	НАЗВАНИЕ ДНЕЙ НЕДЕЛИ
-----------------------------------*/
	self.dayName = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ MODEL
-----------------------------------*/
	self.init = function (view) {
		myView = view;
//---------инициализируем вошедшего пользователя
		this.userName = sessionStorage.whoLogin;
	
// ------ инициализируем события пользователя		
		// --- определяем есть ли события
		var evHash = JSON.parse(localStorage.getItem(this.userName));
		if ('userEvent' in evHash) {
			self.eventHash = JSON.parse(JSON.parse(localStorage.getItem(this.userName)).userEvent)
		}
		
		/*	СОЗДАЕМ КОНТРОЛЛЕР, КОТОРЫЙ ПОТОМ ИНИЦИАЛИЗИРУЕМ ЕГО */	
		if (!Controller) {
			Controller = new CalendarController ();
			Controller.init(self);
		}
	};

	self.updateModel = function (index) {
		if (index == null) {
			getNowDate()
			window.location.hash = name;
		}
		else{
			updateDate (index, name)
		}
		// ------ инициализируем даты
		updateCalendar();
		Controller.update(name);
	}
	
	self.updateView = function (_name) {
		getNowDate (); // задаем сегодняшнюю дату
		updateCalendar();
		self.titleDate = self.monthName[selectedDate.Month] + ' ' + selectedDate.Year;
		if (myView) {
			name = _name;
			// window.location.hash = name;
			if (name != null) {
				myView = null;
				if (name == 'month') {
					myView = new monthView();
 					myView.init(self);
				}
				else if (name == 'week') {
					myView = new weekView();
	  				myView.init(self);
				}
				else if (name == 'day') {
					myView = new dayView();
	  				myView.init(self);
				}
				myView.update(selectedDate.Year, selectedDate.Month, selectedDate.Day);
			}
		}
	Controller.update(name);

	}

/*-----------------------------------
	СОБЫТИЯ В ЕЖЕДНЕВНИКЕ 
-----------------------------------	*/
		// создание события в ежедневнике
	self.createEvent = function(el){
		var elem = el;
		var dateEvent = $(elem).attr("data-date");
		if (!dateEvent) { return false}
		var event = prompt ('Введите событие');
			if (event != null & event != '' ) {
				if (!self.eventHash[dateEvent]) {
					self.eventHash[dateEvent] = [];
					self.eventHash[dateEvent].push(event);
				}
				else{
					self.eventHash[dateEvent].push(event);
				}
				var us = JSON.parse(localStorage.getItem(this.userName));
				var eventJSON = JSON.stringify(self.eventHash);
				us.userEvent = eventJSON;
				us = JSON.stringify(us)
				localStorage.setItem(this.userName, us);
	
				myView.createEvent(event,elem);
			}
			else if (event == '') {
				alert ('Укажите событие');
				self.createEvent(el);
			}
	}

	var V = new monthView();
	V.init(self);

	
	function getNowDate() {
		selectedDate = {
				'Day' : self.nowDate.getDate(),
				'Month' : self.nowDate.getMonth(),
				'Year' : self.nowDate.getFullYear()
			};
	}

	function updateCalendar() {
	// ------ инициализируем даты
		self.titleDate = self.monthName[selectedDate.Month] + ' ' + selectedDate.Year;
		self.totalDays = 32 - new Date(selectedDate.Year, (selectedDate.Month), 32).getDate();
		self.startDay = new Date(selectedDate.Year, selectedDate.Month, 1).getDay()-1; 	// ------- начальный день недели месяца
		self.totalWeek = Math.ceil((self.totalDays+self.startDay)/7); // ------------------------------------- количество недель в месяце
		self.finalIndex = Math.ceil((self.totalDays+self.startDay)/7)*7;	// ------------------------------- количество ячеек в таблице месяца	
}

	function updateDate (index, name) {
		if (name == 'month'|| name == null) {
			self.totalDays = 32 - new Date(selectedDate.Year, (selectedDate.Month), 32).getDate();
			var year = (selectedDate.Month+index>=0 & selectedDate.Month+index<12)?selectedDate.Year:(selectedDate.Year+index);
			var month = (selectedDate.Month+index>=0 & selectedDate.Month+index<12)?(selectedDate.Month+index):(index>0?0:11);
			var day = (selectedDate.Day+index>0 & (selectedDate.Day+index) >= self.totalDays)?(selectedDate.Day+index):(index>0?1:self.totalDays);
		}
		else if (name == 'week') {
			if (index>0) {
				var month = selectedDate.Month<12?selectedDate.Month:selectedDate.Month+1;
				var year = selectedDate.Month>=0?selectedDate.Year:selectedDate.Year+1;
				self.totalDays = 32 - new Date(selectedDate.Year, (selectedDate.Month), 32).getDate();
				var day = (selectedDate.Day+index*7) <= self.totalDays?(selectedDate.Day+index*7):(month +=1, selectedDate.Day=1);
			}
			else if (index<0) {
				var month = (selectedDate.Month>=0 & selectedDate.Month<12)?selectedDate.Month:selectedDate.Month-1;
				var year = (selectedDate.Month>=0 & selectedDate.Month<12)?selectedDate.Year:selectedDate.Year-1;
				var day = (selectedDate.Day+index*7>-6)?(selectedDate.Day+index*7):( month-=1, 32 - new Date(year, (month), 32).getDate());
				
				
			}	
		}
		else if (name == 'day') {
			if (index>0) {
				var month = (selectedDate.Month>=0 & selectedDate.Month<12)?selectedDate.Month:(selectedDate.Month+1);
				var year = (selectedDate.Month>=0 & selectedDate.Month<12)?selectedDate.Year:(selectedDate.Year+1);
				self.totalDays = 32 - new Date(selectedDate.Year, (selectedDate.Month), 32).getDate();
				var day = (selectedDate.Day+index>=0 & (selectedDate.Day+index) <= self.totalDays)?(selectedDate.Day+index):(month +=1, selectedDate.Day=1);
			}
			if (index<0) {
				self.totalDays = 32 - new Date(selectedDate.Year, (selectedDate.Month), 31).getDate();
				var day = (selectedDate.Day+index>0)?(selectedDate.Day+index):( selectedDate.Month-=1, self.totalDays);
				var month = (selectedDate.Month>=0 & selectedDate.Month<12)?(selectedDate.Month):(11);
				var year = (selectedDate.Month>=0 & selectedDate.Month<12)?selectedDate.Year:(selectedDate.Year+index);
			}
		}
		selectedDate = {
					'Day' : day,
					'Month' : month,
					'Year' : year
				}
	

	}
}
