var currUrl = window.location.href.split('/');
currUrl.pop();
var globalUrl = currUrl.join('/');

$(document).ready(function () {
	tampilTryout(0);
	$('#filter-tryout').change(function () {
		tampilTryout(0);
	});

	$('#pagination').on('click', 'a', function (e) {
		e.preventDefault();
		var page = $(this).attr('data-ci-pagination-page');
		tampilTryout(page);
	});

	$('#cariKode').click(function () {
		tampilTryout(0);
	});

	function tampilTryout(page) {
		var type = $('#filter-tryout').val();
		var searchValue = $('#searchFilter').val();
		$.ajax({
			url: globalUrl + '/getDaftarTryout/' + page,
			type: 'POST',
			dataType: 'JSON',
			data: {
				rowno: type,
				kode: searchValue
			},
			success: function (d) {
				console.log(d.last_query);
				$('#pagination').empty();
				$('#tryout-container').empty();
				if (d.status) {
					$('#pagination').html(d.pagination);
					showTryout(d.result, d.row);
				} else {
					var html = '';
					html += '<div class="uk-width-expand"><div class="uk-card uk-card-default uk-box-shadow-small uk-card-body"><p class="uk-text-center">Tidak Ada try Out</p></div></div>';

					$('#tryout-container').append(html);
				}
			}
		});
	}

	function showTryout(data, sno) {
		sno = Number(sno);
		for (index in data) {
			var html = '';
			html += '<div class="uk-width-1-4@m">' +
				'<div class="uk-card card uk-card-default uk-box-shadow-small uk-position-relative" data-label="' + data[index].mulai + '">' +
				'<div class="card-container">' +
				'<div class="uk-card-body">' +
				'<p class="uk-text-center uk-text-bold uk-margin-top" style="color: #5392cc;"></p>' +
				'<h3 class="uk-card-title uk-text-center uk-margin-remove-top">' +
				data[index].nama +
				'</h3>';

			if (data[index].tipe == 1) {
				html += '<p class="uk-text-center">(Tidak Include Pembahasan)</p>';
			} else {
				html += '<p class="uk-text-center">(Include Pembahasan)</p>';
			}

			html += '<div class="uk-text-center">' +
				'<a href="' + globalUrl + '/purchaseTryout/' + data[index].kode + '" class="uk-button uk-button-primary">beli</a>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>'

			$('#tryout-container').append(html);
		}
	}
});
