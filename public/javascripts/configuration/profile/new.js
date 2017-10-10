let listValidations = {}
loadListValidations()

function checkFunctionality(fatherID) {
  $(`input[type=checkbox][value='${fatherID}']`)[0].checked = true
}

function checkFunctionalities(e) {
  let checkboxes = $(e).closest('.father').find('.son input')
  for(let i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = e.checked;
  }
}

$('#formNewProfile').submit(function(e) {
  if($('div.checkbox-group.required :checkbox:checked').length === 0) {
    e.preventDefault()
    swal(listValidations.notSeeUnit, '', 'error')
  }
})
