  /*===================================================================================*/
 /*                   			  C O N T R O L L E R 								  */
/*===================================================================================*/

function EventPopupController() {
	var than = this;
	var myModel = null;
	var eventList = null;	

	than.init = function (model) {
		myModel = model;
		than.addShow();
	}

	than.showEvent = function(EO) {
		var el = EO.target;
		debugger;
		myModel.createEventMenu(EO);
		eventList = document.getElementById('eventListBack');
		eventList.addEventListener('click', than.hideEvent);
	}	
	
	than.hideEvent = function() {
		 $(eventList).detach();
	}

	than.addShow = function () {
		$('.show').each(function(index, el) {
			el.addEventListener('click', than.showEvent);
			});
	}
}