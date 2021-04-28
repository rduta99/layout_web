var currUrl = window.location.href.split('/');
currUrl.pop();
var globalUrl = currUrl.join('/');

$(document).ready(function () {

	$('body').on('change', '#provinsi', function () {
		var data = $(this).val();
		$.ajax({
			url: globalUrl + '/getKabupaten',
			type: 'POST',
			dataType: 'JSON',
			data: {
				provinsi: data
			},
			success: function (d) {
				if (d.status) {
					var arrayData = d.data;
					var result = '<option selected disabled>Pilih Kabupaten / Kota</option>';
					for (var i in arrayData) {
						result += '<option value="' + i + '">' + arrayData[i] + '</option>';
					}

					$('#kabupaten').prop('disabled', false);
					$('#kabupaten').html(result);
				}
			}
		});
	});

	$('#ganti-password').click(function () {
		var pass1 = $('#password_baru').val();
		var pass2 = $('#password_konfirm').val();

		if (pass1 != pass2) {
			UIkit.notification({
				message: 'Password dan Konfirmasi harus sama',
				status: 'warning',
				pos: 'top-center',
				timeout: 3000
			});
		} else {
			UIkit.modal.confirm('Anda yakin akan mengubah password?').then(function () {
				$('#form-password').submit();
			}, function () {});
		}
	});
});
