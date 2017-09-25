window.setTimeout(function() { $(".alert").alert('close'); }, 10000)

function renderDataTable(staticColumns, columnOrder) {
  $.ajax({
    url: '/translate-data-table',
    type: 'GET',
    data: '',
    dataType:'json',
    success: function(data) {
      let columns = []
      staticColumns.forEach(column => {
        columns.push(
          {"targets": [column], "searchable": false, "orderable": false},
        )
      })
      $('.dataTable').DataTable({
        "lengthMenu": [10, 25, 50, 100],
        "scrollX": true,
        "language": data,
        "columnDefs": columns,
        "order": [[ columnOrder, "asc" ]]
      })
    }
  })
}

function loadListValidations(callback) {
  $.ajax({
    url: '/translate-validations',
    type: 'GET',
    data: '',
    dataType:'json',
    success: function(data) {
      listValidations = data
      if(callback) {
        callback()
      }
    }
  })
}

function renderSummernote() {
  $('.summernote').summernote({
    height: 100,
    toolbar: [
      ['misc', ['fullscreen', 'undo', 'redo', 'help']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['table']]
    ]
  })
}

$('#selectAll').click(function(e) {
  if(this.checked) {
    $(':checkbox:not(.disabled)').each(function() {
      this.checked = true
    })
  } else {
    $(':checkbox:not(.disabled)').each(function() {
      this.checked = false
    })
  }
})
