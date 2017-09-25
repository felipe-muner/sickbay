$(document).ready(function() {
  renderDataTable([], 1)
})

function allocateNurseModal(matriculaNurse, nameNurse, sickBayAreaID) {
  $('#nameNurse').text(nameNurse)
  $('#matriculaNurse').val(matriculaNurse)
  $('#sickBayArea').val(sickBayAreaID).change()
  $('#allocateNurseModal').modal('show')
}
