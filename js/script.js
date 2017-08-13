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

	var arrLS;
	var id = 0;
	try {
		arrLS = JSON.parse(localStorage.getItem('key'));
	} catch(err) {
		localStorage.removeItem('key');
	}

	if(arrLS) {
		id = arrLS.length;
		for(var i in arrLS) {
			tableApp.insertAdjacentHTML('beforeend', '<tr><td>' + arrLS[i].id + '</td><td>' + arrLS[i].name + ' </td><td>' + arrLS[i].comment + '</td><td>' + arrLS[i].date + '</td></tr>');
		}
		amountApp.innerHTML = arrLS.length;
	} else {
		arrLS = [];
	}

	function clear() {
		nameApp.value = '';
		commentApp.value = '';
		alertNameApp.innerHTML = '';
		alertCommentApp.innerHTML = '';
	}

	btnAdd.onclick = function() {
		if(!nameApp.value) {
			alertNameApp.innerHTML = "<strong>Введите имя автора</strong>";
			return false;
		}
		if(!commentApp.value) {
			alertCommentApp.innerHTML = "<strong>Введите комментарий</strong>";
			return false;
		}
		var currDate = new Date();
		currDate = currDate.toLocaleString();
		tableApp.insertAdjacentHTML('beforeend', '<tr><td>' + ++id + '</td><td>' + nameApp.value + ' </td><td>' + commentApp.value + '</td><td>' + currDate + '</td></tr>');
		arrLS.push({
			id: id,
			name: nameApp.value,
			comment: commentApp.value,
			date: currDate
		});
		localStorage.setItem('key', JSON.stringify(arrLS));
		modal.style.display = "none";
		amountApp.innerHTML = arrLS.length;
		clear();
	};
};
