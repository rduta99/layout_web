var currUrl = window.location.href.split('/');
currUrl.pop();
// currUrl.pop();
var globalUrl = currUrl.join('/');

$(document).ready(function () {
	$('#tambah-saldo').click(function (e) {
		UIkit.modal('#modalsaldo').show();
	});

	$('#buatPesanan').click(function () {
		var jml = $('#jumlah').val();
		var mtd = $('#metode').val();
		var kode_promo = $('#kode_promo').val();

		if ((jml >= 15000 && jml <= 500000) && mtd != null) {
			jml += '';
			x = jml.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			$('#jumlahSaldo').html('Rp. ' + x1 + x2);
			var value = Math.floor(Math.random() * 100);
			$('#kodePembayaran').html('Rp. ' + value);
			$('#kodeBayar').val(value);
			$('#metodeBayar').html('Transfer ke bank ' + mtd);
			if (kode_promo != '') {
				$.ajax({
					url: globalUrl + '/getPromo',
					type: 'POST',
					dataType: 'JSON',
					data: {
						kode: kode_promo
					},
					success: function (d) {
						if (d.status) {
							var jml_promo = '';
							var promo_detail = '';
							jml_promo += '';
							x = d.promo_jumlah.split('.');
							x1 = x[0];
							x2 = x.length > 1 ? '.' + x[1] : '';
							var rgx = /(\d+)(\d{3})/;
							while (rgx.test(x1)) {
								x1 = x1.replace(rgx, '$1' + ',' + '$2');
							}

							if (d.promo_tipe == 1) {
								promo_detail = 'Cashback Rp. ' + x1 + x2;
							} else {
								promo_detail = 'Potongan Rp. ' + x1 + x2;
							}

							$('#promo').html(promo_detail);
							UIkit.modal('#modalsaldo').hide();
							UIkit.modal('#confirmation').show();
						} else {
							UIkit.notification({
								message: d.msg,
								status: 'warning',
								pos: 'top-right',
								timeout: 3000
							});
						}
					}
				});
			} else {
				UIkit.modal('#modalsaldo').hide();
				UIkit.modal('#confirmation').show();
			}
		} else {
			if (jml == 0) {
				UIkit.notification({
					message: 'Masukan Nominal Top Up',
					status: 'warning',
					pos: 'top-right',
					timeout: '3000'
				});
			} else if (jml < 15000) {
				UIkit.notification({
					message: 'Minimal Top up Rp. 15,000',
					status: 'warning',
					pos: 'top-right',
					timeout: '3000'
				});
			} else if (jml > 15000 && jml > 500000) {
				UIkit.notification({
					message: 'Maksimal Top up Rp. 500,000',
					status: 'warning',
					pos: 'top-right',
					timeout: '3000'
				});
			}

			if (mtd == null) {
				UIkit.notification({
					message: 'Pilih Metode Pembayaran',
					status: 'warning',
					pos: 'top-right',
					timeout: '3000'
				});
			}
		}
	});

	$('#inputTambahSaldo').click(function () {
		$('#tambahSaldoForm').submit();
	});
});
