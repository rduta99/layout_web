$(document).ready(function (e) {
	$('#register-form').submit(function (e) {
		var pass = $('#password').val();
		var repass = $('#re-password').val();

		if (pass !== repass) {
			e.preventDefault();
			UIkit.notification({
				message: 'Password tidak sama',
				status: 'warning',
				pos: 'top-center',
				timeout: 3000
			});
		}
	});
});
