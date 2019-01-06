
  /*===================================================================================*/
 /*                   				   V I E W  - Day								  */
/*===================================================================================*/
function dayView() {
	var self = this;
	var myModel = null;
	var myField = null;

	var curDay = null;
	var curMonth = null;
	var curYear = null;

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
		var text =  myModel.titleDate;
		date.innerHTML = text;
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
	СОЗДАЕМ ЯЧЕЙКИ КАЛЕНДАРЯ
		day   - числа дней месяца
		index - количество ячеек в месяца, 
				включая пустые
------------------------------------*/
		for (var i = 0; i <= 1; i++) {
			var tr = document.createElement('tr');
			tbody.appendChild(tr);
			var weekDay = new Date(curYear, curMonth, curDay-1).getDay();
			// ---- строим дни недели
			if ( i == 0 ) {		
				tr.className = 'dayName';	
				var td = document.createElement('td');
				tr.appendChild(td);
				td.innerHTML = myModel.dayName[weekDay];
			}
			else {
				var td = document.createElement('td');
				tr.appendChild(td);
				td.className = 'numb-day';
				td.innerHTML = curDay;
				//--- заносим дату в свойство элемента 'data-date' 
				td.dataset.date = curDay + '/'+ curMonth + '/'+ curYear;
				var ul = document.createElement('ul');
						td.appendChild(ul);
				//---- если в базе user'а есть событие с таким именем то создаем элемент
				if (td.dataset.date in myModel.eventHash) {
					for (let i =0; i< myModel.eventHash[td.dataset.date].length; i++) {
						self.createEvent(myModel.eventHash[td.dataset.date][i], td)
					}
				}
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