
  /*===================================================================================*/
 /*                   				   V I E W  - Week								  */
/*===================================================================================*/
function weekView() {
	var self = this;
	var myModel = null;
	var myField = null;
	
	var curDay = null;
	var curMonth = null;
	var curYear = null;

	var weekDay = null; //порядковый день недели
/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ MODEL
-----------------------------------*/
	this.init = function (model) {
		myModel = model;
	};
/*-----------------------------------
	МЕТОД ПОСТРОЕНИЯ КАЛЕНДАРЯ (Неделя)
-----------------------------------*/
	this.update = function (_year, _month, _day) {
		curYear = _year;
		curMonth =  _month;
		curDay = _day;
/*-----------------------------------
	ЗАПИСЫВАЕМ ДАТУ В ШАПКЕ КАЛЕНДАРЯ
------------------------------------*/	
		var date = document.getElementById ('month-date');
		date.innerHTML = myModel.titleDate;
/*-----------------------------------
	НАХОДИМ И ОБНУЛЯЕМ КОНТЕЙНЕР C
	КАЛЕНДАРЕМ, СОЗДАЕМ ПОЛЕ 
------------------------------------*/
		var container = document.getElementById ('view-container');
		container.innerHTML = '';

		myField = document.createElement('table');
		container.appendChild(myField);

		var tbody = document.createElement('tbody');
		myField.appendChild(tbody);
/*-----------------------------------
	СОЗДАЕМ СТРОКИ
------------------------------------*/	
		for (var i = 0; i < 2; i++) {
			var tr = document.createElement('tr');
			tbody.appendChild(tr);
/*-----------------------------------
	СОЗДАЕМ СЛОЛБЦЫ КАЖДОЙ СТРОКИ
------------------------------------*/
			for (var j = 0; j < 7; j++) {
/*-----------------------------------
	ПЕРВАЯ СТРОКА - ДНИ НЕДЕЛИ ИЗ МОДЕЛИ
------------------------------------*/	
				var td = document.createElement('td');
				tr.appendChild(td);
				if ( i == 0 ) {	
					tr.className = 'dayName';		
					td.innerHTML = myModel.dayName[j];
				}
/*-----------------------------------
	ОСТАЛЬНЫЕ СТРОКИ - ЧИСЛА + МЕСЯЦ
------------------------------------*/				
				else {
					var div = document.createElement('div');
					td.appendChild(div);
					 td.className = 'week'
					td.id = j;
				}
			}
		}
/*-----------------------------------
	ФУНКЦИЯ РАСЧЕТА ДНЯ НЕДЕЛИ
------------------------------------*/
		if (curDay<0) {curDay=1}
		weekDay = new Date(curYear, curMonth, curDay-1).getDay(); 	// -------  день недели 

		var cell = 0;
		for (var i = weekDay; i>=0; i--) {
			var el = $('#'+ cell );
			//---- если число месяца -1, 
			if (curDay-i>0){
				el.text(curDay-i);
				// --- если дата в ячейке совпадает с сегодняшней датой,то красим ячейку
				if ( el.text() == new Date().getDate() & curMonth == myModel.nowDate.getMonth() & curYear == myModel.nowDate.getFullYear() ) {
					el[0].className = "now-date"
				}
				// ---- для каждой ячейки определеяе свойство data-date 
				el.each(function(index, elem) {
					elem.dataset.date = curDay-i + '/'+ curMonth + '/'+ curYear;
					// --- заполняем ячейку событием, если таковое имеется
					var ul = document.createElement('ul');
					elem.appendChild(ul);
					if (elem.dataset.date in myModel.eventHash) {
						for (let i =0; i< myModel.eventHash[elem.dataset.date].length; i++) {
						self.createEvent(myModel.eventHash[elem.dataset.date][i], elem)
						}
					}
				});
			}
			cell++;
		}
		for (var i = 1; i<7; i++) {
			if (curDay +i<= myModel.totalDays) {
				$('#'+ cell ).text(curDay+i);
				$('#'+ cell ).each(function(index, elem) {
					elem.dataset.date = curDay-i + '/'+ curMonth + '/'+ curYear;
					// --- заполняем ячейку событием, если таковое имеется
					var ul = document.createElement('ul');
					elem.appendChild(ul);
					if (elem.dataset.date in myModel.eventHash) {
						for (let i =0; i< myModel.eventHash[elem.dataset.date].length; i++) {
						self.createEvent(myModel.eventHash[elem.dataset.date][i], elem)
						}
					}
				});
				cell++;
			}
		}
	}
	self.hideEvent = function(td) {
		var show = document.createElement('button');
		show.className = "show";
		show.innerHTML = '...' 
		td.appendChild(show);
	}
	self.createEvent = function(event,el){
		var td = el;
		var ol = document.createElement('ol');
			ol.innerHTML = event;
			ol.className = 'event';
			$(td).find('ul').each(function(index, el) {
				el.appendChild(ol)
			}).end().find('ol:gt(18)').hide(); 
			if ($(td).find('ol').length>19 & !($(td).find('.show').is('.show'))) {
				self.hideEvent(td)
			}
	}
}