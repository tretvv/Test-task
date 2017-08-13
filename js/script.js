window.onload = function() {
	var modal = document.getElementById('modal_app');
	var btn = document.getElementById('add_itemApp');
	var close = document.getElementsByClassName('close')[0];
	btn.onclick = function() {
		modal.style.display = "block";
	};
	close.onclick = function() {
		modal.style.display = "none";
		clear();
	};
	window.onclick = function(event) {
		if(event.target == modal) {
			modal.style.display = "none";
		}
	};

	var tableApp = document.getElementById('table_app');
	var btnAdd = document.getElementById('add_itemApp_modal');
	var nameApp = document.getElementById('name_app');
	var commentApp = document.getElementById('comment_app');
	var amountApp = document.getElementById('amount_app');
	var alertNameApp = document.getElementById('alert_name_app');
	var alertCommentApp = document.getElementById('alert_comment_app');

	if(JSON.parse(localStorage.getItem('key'))) {
		var arrAppLS = JSON.parse(localStorage.getItem('key'));
		var arrApp = arrAppLS;
		var idApp = arrAppLS.length + 1;
		for(var i = 0; i < arrAppLS.length; i++) {
			tableApp.insertAdjacentHTML('beforeend', '<tr><td>' + arrAppLS[i].id + '</td><td>' + arrAppLS[i].name + ' </td><td>' + arrAppLS[i].comment + '</td><td>' + arrAppLS[i].date + '</td></tr>');
		}
		amountApp.innerHTML = arrApp.length;
	} else {
		var arrApp = [];
		var idApp = 1;
	}

	function formatDate(date) {
		var monthNames = [
			"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
		];
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		if(minutes < 10) {
			minutes = '0' + minutes;
		}
		return day + '.' + monthNames[monthIndex] + '.' + year + ' ' + hours + ':' + minutes;
	}

	function clear() {
		nameApp.value = "";
		commentApp.value = "";
		alertNameApp.innerHTML = '';
		alertCommentApp.innerHTML = '';
	}

	btnAdd.onclick = function() {
		if(nameApp.value == '') {
			alertNameApp.innerHTML = "<strong>Введите имя автора</strong>";
			return false;
		}
		if(commentApp.value == '') {
			alertCommentApp.innerHTML = "<strong>Введите комментарий</strong>";
			return false;
		}
		tableApp.insertAdjacentHTML('beforeend', '<tr><td>' + idApp + '</td><td>' + nameApp.value + ' </td><td>' + commentApp.value + '</td><td>' + formatDate(new Date()) + '</td></tr>');
		arrApp.push({
			id: idApp,
			name: nameApp.value,
			comment: commentApp.value,
			date: formatDate(new Date())
		});
		localStorage.setItem('key', JSON.stringify(arrApp));
		modal.style.display = "none";
		amountApp.innerHTML = arrApp.length;
		idApp++;
		clear();
	};
};
