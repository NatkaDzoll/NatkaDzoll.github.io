
  /*===================================================================================*/
 /*                   				   V I E W  - Month								  */
/*===================================================================================*/
function monthView() {
	var myModel = null;
	var myField = null;
	var self = this;
/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ VIEW
-----------------------------------*/
	this.init = function (model) {
		myModel = model;
		myModel.init(this);
	};
/*-----------------------------
	МЕТОД ПОСТРОЕНИЯ КАЛЕНДАРЯ (МЕСЯЦ)
 -----------------------------------*/
	this.update = function (_year, _month, _day) {
		var year = _year;
		var month =  _month;
		var day = _day;
		var userField =  document.getElementById ('user');
		userField.innerHTML = myModel.userName;
/*-----------------------------------
	ЗАПИСЫВАЕМ ДАТУ В ШАПКЕ КАЛЕНДАРЯ
------------------------------------*/			
		var date = document.getElementById ('month-date');
		var text = myModel.titleDate + '';
		date.innerHTML = text;
/*-----------------------------------
	НАХОДИМ И ОБНУЛЯЕМ КОНТЕЙНЕР C
	КАЛЕНДАРЕМ, СОЗДАЕМ ПОЛЕ 
------------------------------------*/
		var container = document.getElementById ('view-container');
		container.innerHTML = '';

		myField = document.createElement('table');
		myField.id = 'month';
		container.appendChild(myField);

		var tbody = document.createElement('tbody');
		myField.appendChild(tbody);
/*-----------------------------------
	СОЗДАЕМ ЯЧЕЙКИ КАЛЕНДАРЯ
		day   - числа дней месяца
		index - количество ячеек в месяца, 
				включая пустые
------------------------------------*/
		var curDay = 1;
		var index = 0;
/*-----------------------------------
	СОЗДАЕМ СТРОКИ
------------------------------------*/	
		for (let i = 0; i <= myModel.totalWeek; i++) {
			var tr = document.createElement('tr');
			tbody.appendChild(tr);
/*-----------------------------------
	ЗАПОЛНЯЕМ ПЕРВУЮ СТРОКУ
	ДНЯМИ НЕДЕЛИ ИЗ МОДЕЛИ
------------------------------------*/	
			for (let j = 0; j < 7; j++) {
				var td = document.createElement('td');
				tr.appendChild(td);
				if ( i == 0 ) {				
					tr.className = 'dayName';
					td.innerHTML = myModel.dayName[j];
				};
/*-----------------------------------
	ЗАПОЛНЯЕМ КАЛЕНДАРЬ В ЗАВИСИМОСТИ 
	ОТ КОЛИЧЕСТВА ДНЕЙ
------------------------------------*/	
				if ( i > 0 ) {
					if (!(index < myModel.startDay) & !(index >= myModel.totalDays+myModel.startDay) & index < myModel.finalIndex ) {
						if (curDay == myModel.nowDate.getDate() & 
							month ==  myModel.nowDate.getMonth() &
							year == myModel.nowDate.getFullYear()) {
							td.className = "now-date";
						}
						td.innerHTML = curDay;
						td.dataset.date = curDay+ '/'+month + '/'+ year;
						var ul = document.createElement('ul');
						td.appendChild(ul);
						if (td.dataset.date in myModel.eventHash) {
							for (let i =0; i< myModel.eventHash[td.dataset.date].length; i++) {
								this.createEvent(myModel.eventHash[td.dataset.date][i], td)
							}
						}
						curDay++;
					}
					else {
						td.className = "empty";
					}
					index++;
	       		}
			}
		}
	}
	self.buttonShow = function(td) {
		var show = document.createElement('button');
		show.className = "show";
		show.innerHTML = '...' 
		td.appendChild(show);
		debugger;
		eventPopupC.updateButton();
	}
	this.createEvent = function(event,el){
		var td = el;
		var ol = document.createElement('ol');
			ol.innerHTML = event;
			ol.className = 'event';
			$(td).find('ul').each(function(index, el) {
				el.appendChild(ol)
			}).end().find('ol:gt(1)').hide(); 
			if ($(td).find('ol').length>2 & !($(td).find('.show').is('.show'))) {
				self.buttonShow(td)
			}
	}

}
