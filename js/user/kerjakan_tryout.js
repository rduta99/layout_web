var currUrl = window.location.href.split('/');
currUrl.pop();
currUrl.pop();
var globalUrl = currUrl.join('/');

$(document).ready(function () {
	$('#soal-container').removeClass('uk-hidden');
	tampilSoal(1);
	var duration = $('#durasi').val();

	setTimeout(function () {
		$('#formSoal').submit();
	}, (duration * 60 * 1000));

	$('.soalNav').click(function () {
		var id = $(this).attr('id');
		tampilSoal(id);
	});

	$('#selesai').click(function () {
		$('#formSoal').submit();
	});


});

function tampilSoal(nomor) {
	if ($('#soal' + nomor).is(':empty')) {
		var kode = $('#kode-tryout').val();
		$.ajax({
			url: globalUrl + '/getSoal',
			type: 'POST',
			dataType: 'JSON',
			data: {
				kode: kode,
				nomor: nomor
			},
			success: function (d) {
				$('#soal' + nomor).html(d.pertanyaan);
				var abj = ['A', 'B', 'C', 'D', 'E'];
				var j = 0;
				var tipe = '';
				var html = '';

				if (d.tipe_soal == 1) {
					tipe = 'TWK';
				} else if (d.tipe_soal == 2) {
					tipe = 'TIU';
				} else {
					tipe = 'TKP';
				}


				if (d.jawaban.status) {
					var html = '<div class="uk-child-width-1-3@m" uk-grid>';

					for (var i in d.jawaban) {
						if (i != 'status') {
							html += '<div><label for="' + i + nomor + '" class="radio-custom uk-margin-bottom"><input type="radio" onclick="changeNumber(' + nomor + ')" value="' + abj[j] + '" name="' + tipe + nomor + '" id="' + i + nomor + '"><span>' + abj[j] + '</span><img class="uk-margin-left" src="data:png;base64,' + d.jawaban[i] + '" uk-img></label></div>';

							++j;
						}
					}
					html += '</div>';
				} else {

					for (var i in d.jawaban) {
						if (i != 'status') {
							html += '<label for="' + i + nomor + '" class="radio-custom uk-margin-bottom"><input type="radio" onclick="changeNumber(' + nomor + ')" value="' + abj[j] + '" name="' + tipe + nomor + '" id="' + i + nomor + '"><span>' + abj[j] + '</span>' + d.jawaban[i] + '</label>';

							++j;
						}
					}
				}

				$('#jawaban' + nomor).html(html);
			}
		});
	}

	$('.soal').removeClass('uk-hidden');
	$('.soal').addClass('uk-hidden');
	$('#nomorSoal').html(nomor);
	$('#soal' + nomor).parent().parent().removeClass('uk-hidden');
}

function changeNumber(nomor) {
	$('#' + nomor).removeClass('uk-button-default');
	$('#' + nomor).addClass('uk-button-primary');
}
