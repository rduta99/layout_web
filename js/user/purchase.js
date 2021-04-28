var currUrl = window.location.href.split('/');
currUrl.pop();
currUrl.pop();
var globalUrl = currUrl.join('/');

var userCount = 0;

function countUsers(status) {
	if (status) {
		this.userCount += 1;
	}
}

function resetCount() {
	this.userCount = 0;
}

function check(counter, length) {
	if (counter == length) {
		if (this.userCount < 2) {
			UIkit.notification({
				message: 'Minimal pembelian untuk 3 orang',
				status: 'warning',
				pos: 'top-right',
				timeout: 3000
			});
		} else {
			var list = $('.cari-teman');
			$('#list-teman').find('ol').empty();
			list.each(function () {
				$('#list-teman').find('ol').append('<li>' +
					$(this).val() +
					'</li>');
			});

			var harga = $('#harga-tryout').val();

			if (harga == 0) {
				$('#total-bayar').html('<div class="uk-text-center uk-text-bold" style="color: #2f8be1; font-size: 20px">FREE</div>');
			} else {
				var saldo = $('#saldo').val();
				var tipePotongan = $('#potongan_tipe').val();
				var tigaPotongan = $('#potongan_tiga').val();
				var limaPotongan = $('#potongan_lima').val();
				if (this.userCount >= 2 && this.userCount < 4) {
					if (tipePotongan == 1) {
						harga -= ((harga * tigaPotongan) / 100);
					} else {
						harga -= tigaPotongan;
					}
				} else if (this.userCount == 4) {
					if (tipePotongan == 1) {
						harga -= ((harga * limaPotongan) / 100);
					} else {
						harga -= limaPotongan;
					}
				}

				var html = '<table class="uk-table uk-table-striped"><tr><td>Jumlah Orang</td><td>:</td><td> ' + (this.userCount + 1) + ' Orang</td></tr>';
				html += '<tr><td>Harga satuan</td><td>:</td><td> Rp. ' + valConvert(harga) + '</td></tr>';
				html += '<hr><tr><td><strong>Total</td><td>:</td><td> Rp. ' + valConvert((this.userCount + 1) * harga) + '</strong></td></tr>';
				html += '<tr><td>Saldo</td><td>:</td><td> Rp. ' + valConvert(saldo) + '</td></tr>';
				html += '<tr><td>Sisa Saldo</td><td>:</td><td> Rp. ' + valConvert(saldo - ((this.userCount + 1) * harga)) + '</td></tr></table>';
				if (saldo < ((this.userCount + 1) * harga)) {
					html += '<div class="uk-alert-danger">Saldo anda tidak cukup</div>';
					$('#konfirmasi-beli').prop('disable', true);
				} else {
					html += '<div class="uk-alert-primary">Anda akan membeli Try Out untuk anda dan ' + this.userCount + ' Orang teman anda</div>';
					$('#konfirmasi-beli').prop('disable', false);
				}

				$('#total-bayar').html(html);
			}

			UIkit.modal('#beli-untuk-teman').hide();
			UIkit.modal('#modal-detail').show();
		}
	}
}

function valConvert(jml) {
	jml += '';
	x = jml.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}

	return (x1 + x2);
}


$(document).ready(function () {
	var count = 0;

	$('#konfirmasi-beli').click(function () {
		$('#beli-dengan-teman').submit();
	});

	$('#tambah-teman').click(function () {
		if (count == 2) {
			UIkit.notification({
				message: 'Maksimal pembelian hanya untuk 5 orang',
				status: 'warning',
				pos: 'top-right',
				timeout: 3000
			});
		} else {
			var html = '<div class="uk-margin" uk-grid><div class="uk-width-expand"><div class="uk-margin"><input placeholder="Email teman anda" type="text" name="username[]" class="uk-input cari-teman"></div></div><div class="uk-width-auto"><button type="button" class="uk-button uk-button-danger remove"><i uk-icon="icon: close"></i></div>';
			$('#teman').append(html);

			count += 1;
		}
	});

	$('#teman').on('click', '.remove', function () {
		$(this).parent().parent().remove();

		count -= 1;
	});


	$('#belikan-teman').click(function () {
		var counter = 1;
		var inp = $('#beli-dengan-teman').find('input:text');
		var inpLength = inp.length;
		resetCount();
		inp.each(function () {
			if ($(this).val() != '') {
				var username = $(this).val();
				var elem = $(this);
				$.ajax({
					url: globalUrl + '/checkUser',
					type: 'POST',
					dataType: 'JSON',
					data: {
						username: username
					},
					success: function (d) {
						if (!d.status) {
							UIkit.notification({
								message: 'Nama / Email tidak ditemukan',
								status: 'warning',
								pos: 'top-right',
								timeout: 3000
							});

							elem.addClass("uk-form-danger");
						} else {
							countUsers(d.status);
							check(counter, inpLength);
							elem.removeClass("uk-form-danger");
						}

						counter++;
					}
				});
			}

		});

	});
});
