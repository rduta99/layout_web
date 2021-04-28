$(document).ready(function () {
	$('#dataTable').DataTable({
		"dom": '<"pull-left"f><"pull-right"l>tip',
		scrollY: true,
		paging: false,
		autoWidth: true
	});
});
