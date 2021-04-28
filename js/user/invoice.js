$(document).ready(function () {
	$('#upload-bukti').submit(function (e) {
		var fileInput = $.trim($('#bukti_pembayaran').val());
		if (!fileInput && fileInput === '') {
			e.preventDefault();
			UIkit.notification({
				message: 'Pilih berkas terlebih dahulu',
				status: 'warning',
				pos: 'top-center',
				timeout: 3000
			});
		}
	});
});
